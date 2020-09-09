import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var GrapeCity: any;
declare var fileDialog: any;
declare var baseServerApi: any;
declare var fileView: any;
declare var dataSetPicker: any;
declare var ARDataSourceEditor: any;
declare var $: any;

function showElement(id) {
  if (!id) return;
  ($('#' + id)).css('display', 'block');
};

function hideElement(id) {
  if (!id) return;
  ($('#' + id)).css('display', 'none');
};

var designerId = 'designer-id';
var fileViewId = 'file-view-id';
var viewerId = 'viewer-id';
var saveAsDialogId = 'save-as-dialog-id';
var dataSetPickerDialogId = 'data-set-picker-dialog-id';
var dataSourceEditorDialogId = 'data-source-editor-dialog-id';
var dialogs = [saveAsDialogId, dataSetPickerDialogId, dataSourceEditorDialogId];

function hideDialogs() {
  dialogs.forEach(hideElement);
}

function showDesigner() {
  var info = GrapeCity.ActiveReports.WebDesigner.api.getReportInfo();
  var isDirty = GrapeCity.ActiveReports.WebDesigner.api.isReportDirty();
  document.title = info.name + (isDirty ? ' *' : '');
  showElement(designerId);
  GrapeCity.ActiveReports.WebDesigner.focus();
};

function onSave(options) {
  GrapeCity.ActiveReports.WebDesigner.api.saveReport({
    reportInfo: {
      id: options.reportInfo.id,
      name: options.reportInfo.name,
    },
  });
}

function onSaveAs(options) {
  showElement(saveAsDialogId);

  fileDialog.createSaveReportAsDialog(saveAsDialogId, {
    api: {
      getReportsList: function () {
        return baseServerApi.getReportsList().then(function (reportsList) {
          return reportsList.map(function (reportInfo) {
            return { path: reportInfo.Name };
          });
        });
      },
      saveReport: function (saveOptions) {
        return baseServerApi.saveNewReport({ name: saveOptions.path, content: options.reportInfo.content }).then(function (saveResult) {
          return { id: saveResult.Id };
        });
      },
    },
    locale: options.locale,
    reportInfo: {
      path: options.reportInfo.name,
    },
    onSuccess: function (saveResult) {
      hideElement(saveAsDialogId);
      options.onSuccess({ id: saveResult.id, name: saveResult.path });
    },
    onClose: function () {
      hideElement(saveAsDialogId);
      showDesigner();
    },
  });
}

function makeOptions(baseOptions, additionalOptions) {
  return $.extend({}, baseOptions || {}, additionalOptions || {});
}

function openFileView(options) {
  hideElement(designerId);
  showElement(fileViewId);

  var fileViewOptions = makeOptions(options, {
    onClose: function () {
      if (options.onClose) options.onClose();
      hideElement(fileViewId);
      showDesigner();
    },
    serverApi: {
      getReportsList: baseServerApi.getReportsList,
      getReportRevisions: baseServerApi.getReportRevisions,
      getDataSetsList: baseServerApi.getDataSetsList,
      getTemplatesList: baseServerApi.getTemplatesList,
      getTemplateContent: baseServerApi.getTemplateContent,
      getTemplateThumbnail: baseServerApi.getTemplateThumbnail,
    },
    createReport: GrapeCity.ActiveReports.WebDesigner.api.createReport,
    openReport: GrapeCity.ActiveReports.WebDesigner.api.openReport,
    saveReport: GrapeCity.ActiveReports.WebDesigner.api.saveReport,
  });

  fileView.renderFileView(fileViewId, fileViewOptions);
}

function openDataSetPicker(options) {
  var openInPanel = options.mode === 'Panel';
  if (!openInPanel) {
    hideDialogs();
    showElement(dataSetPickerDialogId);
  }
  dataSetPicker.renderDataSetPicker(openInPanel ? options.elementId : dataSetPickerDialogId, makeOptions(options, {
    serverApi: {
      getDataSetsList: baseServerApi.getDataSetsList,
      getDataSourcesAndDataSets: baseServerApi.getDataSourcesAndDataSets,
    },
    onClose: function () {
      options.onClose();
      if (!openInPanel) hideElement(dataSetPickerDialogId);
      dataSetPicker.dispose();
      showDesigner();
    }
  }));
}

function openDataSourceEditor(options) {
  ARDataSourceEditor.open(makeOptions(options, {
    serverApi: {
      testConnection: function(opts) {
        return baseServerApi.testDataSourceConnection(makeOptions(opts, {
          reportId: GrapeCity.ActiveReports.WebDesigner.api.getReportInfo().id,
        }));
      },
    },
  }));
};

function closeDataSetPicker() {
  dataSetPicker.dispose();
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  reportName: any;
  @ViewChild('viewer', {static: false}) private viewerElement: ElementRef;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      var id = params['id'];
      var designerOptions = GrapeCity.ActiveReports.WebDesigner.createDesignerOptions(baseServerApi);
      designerOptions.reportInfo = id ? { id: id, name: id } : null;
      designerOptions.reportItemsFeatures.table.autoFillFooter = true;
      designerOptions.saveButton.visible = true;
      designerOptions.onSave = onSave;
      designerOptions.saveAsButton.visible = true;
      designerOptions.onSaveAs = onSaveAs;
      designerOptions.openFileView = openFileView;
      designerOptions.openViewer = this.openViewer.bind(this);
      designerOptions.dataTab.dataSets.canModify = true;
      designerOptions.dataSetPicker.open = openDataSetPicker;
      designerOptions.dataSetPicker.close = closeDataSetPicker;
      designerOptions.dataTab.dataSources.canModify = true;
      designerOptions.openDataSourceEditor = openDataSourceEditor;
      GrapeCity.ActiveReports.WebDesigner.renderApplication(designerId, designerOptions);
    });
  }

  ngOnInit() {
    ARDataSourceEditor.init(dataSourceEditorDialogId);
  }

  public openViewer(options) {
    hideElement(designerId);
    showElement(viewerId);
    this.reportName = options.reportInfo.name;
    this.viewerElement.nativeElement.insertAdjacentHTML('afterbegin', '<div id="viewer-main-id" style="width: 100%; height: 100%;"></div>');

    GrapeCity.ActiveReports.JSViewer.create({
      element: '#' + 'viewer-main-id',
      reportService: {
        url: 'api/reporting',
      },
      reportID: unescape(options.reportInfo.id),
      settings: {
        zoomType: 'FitPage'
      },
    });
  }

  public closeViewer() {
    showElement(designerId);
    hideElement(viewerId);
    this.viewerElement.nativeElement.firstElementChild.remove();
  }
}