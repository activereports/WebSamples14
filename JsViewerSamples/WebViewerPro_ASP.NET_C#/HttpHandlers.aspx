<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HttpHandlers.aspx.cs" Inherits="GrapeCity.ActiveReports.Samples.Web.HttpHandlers" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <link rel="stylesheet" type="text/css" href="CSS/default.css"/>
   <script src="Scripts/default.js" type="text/javascript"></script>
   <title></title>
</head>
<body onload="bodyLoad()">
    <form id="form1" runat="server">
    </form>
    <div id="pagetop">
		<div id="pagetitlebanner">
			<h1><a href="default.aspx">ActiveReports Professional Edition Web Sample</a></h1>
			<h2>HttpHandler Samples</h2>
		</div>
	</div>
    		<!-- begin scrollable content -->
		<div id="pagebody">
		
		<!-- General Info applicable to all Handlers -->
		<p>
		ActiveReports provides HttpHandler components that, upon configuration, allow ASP.NET to 
		automatically process reports that have been placed into a ASP.NET web site folder.
		ActiveReports' HttpHandler components enable easily deployable reports in both HTML and 
		PDF file formats.

		ActiveReports includes a simple configuration utility to properly register the HttpHandler 
		components with IIS and ASP.NET; all you need to do is drop your reports into a web site 
		folder to deploy them. That's it !
		</p>
			
	<h2>ActiveReports RPX and RDLX HttpHandler</h2>

            <div>
                <p>
                    The RPX and RDLX HttpHandler processes and outputs reports from ActiveReports layout
                    files (ending in the .rpx/.rdlx extension). When the ASP.NET receives a request
                    for a ActiveReport file ending with the .rpx/.rdlx extension, the RPX/RDLX HttpHandler
                    will run, and return the report's output in a format of your choice.
                     </p>
                    <p>
                        For example:</p>
                    <ul>
                        <li><a href="RpxReports/NwindLabels.rpx?OutputFormat=PDF">NwindLabels.<span style="color: red">rpx</span>?OutputFormat=<span
                            style="color: red">pdf</span></a> </li>
                        <li><a href="RpxReports/NwindLabels.rpx?OutputFormat=HTML">NwindLabels.<span style="color: red">rpx</span>?OutputFormat=<span
                            style="color: red">html</span></a> </li>
                        <li><a href="PageReports/PurchaseReport.rdlx?OutputFormat=PDF">PurchaseReport.<span
                            style="color: red">rdlx</span>?OutputFormat=<span style="color: red">pdf</span></a>
                        </li>
                    </ul>
                   
                    You can also use pass parameters to your reports:
                    <ul>
                        <li><a href="RpxReports/NwindLabelsFiltered.rpx?Country=USA">NwindLabels.<span style="color: red">rpx</span>?<span
                            style="color: red">Country=USA</span></a> </li>
                        <li><a href="RpxReports/InvoiceFiltered.rpx?StartingDate=1994-9-1&EndingDate=1994-9-5">
                            Invoice.<span style="color: red">rpx</span>?<span style="color: red">?StartingDate=1994-9-1&EndingDate=1994-9-5</span></a>
                        </li>
                    </ul>                  
               
            </div>

	
		<h2>ActiveReports Compiled Report HttpHandler</h2>
				
            <div>
                <p>
                    The compiled Report HttpHandler enables easy distribution of ActiveReports that
                    use compiled .NET source code. If a report requires the raw power, flexibility and
                    efficiency of compiled source code the Compiled Report HttpHandler is a natural
                    choice. Compiled reports are exposed as a .NET class in a .NET assembly file. When
                    ASP.NET receives a request for a file with the .ActiveReport extension, the Compiled
                    Report handler will load the ActiveReport from the assembly, run it, and return
                    the output in a format of your choice.
                    </p>
                    <p>
                        The syntax for the HttpHandler is:
                    </p>
                    <span style="font-style: italic">http://www.yoursite.com/<span style="color: blue;">AssemblyName</span>/<span
                        style="color: green; font-style: italic">ReportName</span>.ActiveReport </span>
                    <p>
                        For example:</p>
                    <ul>
                        <li><a href="http://localhost:4600/ActiveReportsWebPro/GrapeCity.ActiveReports.Samples.Web.CodeReports.Invoice.ActiveReport?OutputFormat=PDF">
                            /<span style="color: blue;">ActiveReportsWebPro</span>/<span style="color: green;">GrapeCity.ActiveReports.Samples.WebReports.Invoice</span>.ActiveReport?OutputFormat=PDF
                        </a></li>
                        <li><a href="http://localhost:4600/ActiveReportsWebPro/GrapeCity.ActiveReports.Samples.Web.CodeReports.NwindLabels.ActiveReport?OutputFormat=HTML">
                            /<span style="color: blue;">ActiveReportsWebPro</span>/<span style="color: green;">GrapeCity.ActiveReports.Samples.WebReports.NWindLabels</span>.ActiveReport?OutputFormat=HTML
                        </a></li>
                    </ul>
                   
                    
                    <span>You can also use pass parameters to your reports:</span>
                    <ul>
                        <li><a href="http://localhost:4600/ActiveReportsWebPro/GrapeCity.ActiveReports.Samples.Web.CodeReports.InvoiceFiltered.ActiveReport?StartingDate=1994-9-1&EndingDate=1994-9-5">
                            /<span style="color: red;">ActiveReportsWebPro</span>/<span style="color: green;">GrapeCity.ActiveReports.Samples.WebReports.InvoiceFiltered</span>.ActiveReport?<span
                                style="color: red;">StartingDate=1994-9-1&EndingDate=1994-9-5</span> </a>
                        </li>
                        <li><a href="http://localhost:4600/ActiveReportsWebPro/GrapeCity.ActiveReports.Samples.Web.CodeReports.NwindLabelsFiltered.ActiveReport?Country=USA">
                            /<span style="color: red;">ActiveReportsWebPro</span>/<span style="color: green;">GrapeCity.ActiveReports.Samples.WebReports.NWindLabelsFiltered</span>.ActiveReport?<span
                                style="color: red;">Country=USA</span> </a></li>
                    </ul>
                    
                    
                    <i>* Note </i><span>that the report name portion must contain the namespace.</span> 
                
            </div>
		<!-- End scrollable content -->
</div>
</body>
</html>
