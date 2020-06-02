import React from "react";
import { ReportsList } from "./reportsList";
import { ReportViewer } from "./reportViewer";
import { ReportProvider, reportContext } from "./reportProvider";

function App() {
  return (
    <div className="main">
      <ReportProvider>
        <ReportsList />
        <reportContext.Consumer>
          {(val) => <ReportViewer reportId={val?.currentReport || ""} />}
        </reportContext.Consumer>
      </ReportProvider>
    </div>
    // <Container fluid>
    //   <ReportProvider>
    //     <Row>
    //       <Col md={2}>
    //         <ReportList />
    //       </Col>
    //       <Col md={10}>
    //         <reportContext.Consumer>
    //         { val => <ReportViewer reportId={val?.currentReport || ''} />}
    //         </reportContext.Consumer>
    //       </Col>
    //     </Row>
    //   </ReportProvider>
    // </Container>
  );
}

export default App;
