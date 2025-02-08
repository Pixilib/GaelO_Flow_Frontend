import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Card, CardBody } from "../../ui";
import Anonymize from "./Anonymize";
import Delete from "./Delete";
import { Colors } from "../../utils";
import RetrieveRoot from "./retrieve/RetrieveRoot";

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
          onClick={() => navigate("retrieve")}
        />
        <Tab
          title="Anonymize"
          active={path.endsWith("anonymize")}
          onClick={() => navigate("anonymize")}
        />
        <Tab
          title="Delete"
          active={path.endsWith("delete")}
          onClick={() => navigate("delete")}
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
          <Route path="anonymize" element={<Anonymize />} />
          <Route path="delete" element={<Delete />} />
        </Routes>
      </CardBody>
    </Card>
  );
};

export default QueuesRoot;
