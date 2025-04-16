import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Tabs, Tab, Card, CardBody } from "../../ui";
import { Colors } from "../../utils";
import RetrieveRoot from "./retrieve/RetrieveRoot";
import AnonymizeRoot from "./anonymize/AnonymizeRoot";
import DeleteRoot from "./delete/DeleteRoot";
import ProcessingRoot from "./processing/ProcessingRoot";

const QueuesRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Card >
      <Tabs className="rounded- bg-light-gray">
        <Tab
          title="Retrieve"
          active={path.endsWith("retrieve")}
          onClick={() => navigate("/administration/queues/retrieve")}
        />
        <Tab
          title="Anonymize"
          active={path.endsWith("anonymize")}
          onClick={() => navigate("/administration/queues/anonymize")}
        />
        <Tab
          title="Delete"
          active={path.endsWith("delete")}
          onClick={() => navigate("/administration/queues/delete")}
        />
        <Tab
          title="Processing"
          active={path.endsWith("processing")}
          onClick={() => navigate("/administration/queues/processing")}
        />
      </Tabs>
      <CardBody
        color={Colors.almond}
        roundedTopLeft={false}
        roundedTopRight={false}
        roundedBottomLeft
        roundedBottomRight
        className="dark:bg-neutral-500"
      >
        <Routes>
          <Route path="retrieve" element={<RetrieveRoot />} />
          <Route path="anonymize" element={<AnonymizeRoot />} />
          <Route path="delete" element={<DeleteRoot />} />
          <Route path="processing" element={<ProcessingRoot />} />
        </Routes>
      </CardBody>
    </Card>
  );
};

export default QueuesRoot;
