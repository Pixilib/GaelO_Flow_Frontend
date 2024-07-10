import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Spinner, Tabs, Tab, Card, CardBody } from "../../ui";
import { useCustomQuery } from "../../utils/reactQuery";
import { OptionsResponse } from "../../utils/types";
import { getOptions } from "../../services/options";

import Retrieve from "./Retrieve";
import Anonymize from "./Anonymize";
import Delete from "./Delete";
import { Colors } from "../../utils";

const QueuesRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const { data: options, isPending: isLoadingOptions } =
    useCustomQuery<OptionsResponse>(["options"], () => getOptions());

  if (isLoadingOptions) return <Spinner />;

  return (
    <Card className="bg-light">
      <Tabs className="rounded-t bg-light-gray">
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
        color={Colors.gray}
        roundedTopLeft={false}
        roundedTopRight={false}
        roundedBottomLeft
        roundedBottomRight
      >
        <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Manage Queues</h2>
        <Routes>
          <Route
            path="retrieve"
            element={<Retrieve data={options as OptionsResponse} />}
          />
          <Route path="anonymize" element={<Anonymize />} />
          <Route path="delete" element={<Delete />} />
        </Routes>
      </CardBody>
    </Card>
  );
};

export default QueuesRoot;
