import { Route, Routes, To, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../../ui";
import RedisCard from "./RedisCard";
import OrthancSettingsCard from "./OrthancCard";
import { getOptions } from "../../services/options";
import { useCustomQuery } from "../../utils/reactQuery";

const General = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, error, isPending } = useCustomQuery(["options"], () =>
    getOptions()
  );

  const handleTabClick = (tab: To) => {
    navigate(tab);
  };

  if (isPending) return <span>Loading...</span>;
  if (error || !data) return <span>Error: {error.message}</span>;

  return (
    <div
      className="mx-4 mt-4 mb-4 shadow-md bg-almond rounded-xl"
      data-gaelo-flow="general-root"
    >
      <Tabs className="bg-primary rounded-t-xl">
        <Tab
          title="Redis"
          active={location.pathname === "/administration/general"}
          onClick={() => handleTabClick("/administration/general")}
        />
        <Tab
          title="Orthanc"
          active={location.pathname === "/administration/general/orthanc"}
          onClick={() => handleTabClick("/administration/general/orthanc")}
        />
      </Tabs>
      <div className="mt-4 mb-4">
        <Routes>
          <Route
            path="/"
            element={
              <RedisCard
                redisData={{
                  address: data.redisAddress,
                  port: Number(data.redisPort),
                  //password: data.redisPassword,
                }}
              />
            }
          />
          <Route
            path="orthanc"
            element={
              <OrthancSettingsCard
                orthancData={{
                  address: data.orthancAddress,
                  port: Number(data.orthancPort),
                  password: data.orthancPassword,
                  username: data.orthancUsername,
                }}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default General;
