import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Spinner, Tabs, Tab } from "../../ui";
import { useCustomQuery } from "../../utils/reactQuery";
import { OptionsResponse } from "../../utils/types";
import { getOptions } from "../../services/options";

import Retrieve from "./Retrieve";
import Anonymize from "./Anonymize";
import Delete from "./Delete";

const QueuesRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;


  const { data: options, isPending: isLoadingOptions } =
    useCustomQuery<OptionsResponse>(["options"], () => getOptions());

  if (isLoadingOptions) return <Spinner />;

  return (
    <div className="mx-7">
      <Tabs className={`bg-light-gray`}>
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
      
      <Routes>
        <Route
          path="retrieve"
          element={<Retrieve data={options as OptionsResponse} />}
        />
        <Route 
        path="anonymize" 
        element={<Anonymize />} 
        />
        <Route 
        path="delete" 
        element={<Delete />} 
        />
      </Routes>
    </div>
  );
};

export default QueuesRoot;
