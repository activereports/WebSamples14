import React from "react";
import { reportContext } from "./reportProvider";

export const ReportsList: React.FC = () => {
  const reportProvider = React.useContext(reportContext);

  return (
    <div className="main-nav navbar">
      <div id="list-heading"> Select report</div>
      <ul id="reportsList" className="nav navbar-nav">
        {reportProvider?.reportsList.map((report) => (
          <li
            className={
              "reportList_item" +
              (report === reportProvider.currentReport ? " active" : "")
            }
            key={report}
            onClick={() => {
              reportProvider?.setCurrentReport(report);
            }}
          >
            <span>{report}</span>
          </li>
        ))}
      </ul>
    </div>
    // <ListGroup variant="flush">
    //   {reportProvider?.reportsList.map((report) => (
    //     <ListGroup.Item
    //       key={report}
    //       action
    //       onClick={() => {
    //         reportProvider?.setCurrentReport(report);
    //       }}
    //       active={reportProvider?.currentReport === report}
    //     >
    //       {report}
    //     </ListGroup.Item>
    //   ))}
    // </ListGroup>
  );
};
