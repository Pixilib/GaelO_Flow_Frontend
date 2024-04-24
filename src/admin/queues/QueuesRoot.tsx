// import Card from "../../ui/Card";
import Spinner from "../../ui/Spinner";
import Tabs, { Tab } from '../../ui/menu/Tabs';
import { useCustomQuery } from "../../utils/reactQuery";
import { getOptions } from "../../services/options";
import { OptionsResponse } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import Retrieve from "./Retrieve";
import Anonymize from "./Anonymize";
import Delete from "./Delete";


//! WIP - This is the root component for the Queues
const QueuesRoot = () => {
  const navigate = useNavigate();
  const { data: options, isPending: isLoadingOptions } = useCustomQuery<OptionsResponse>(
    ["options"],
    () => getOptions(),
    {
      enabled: true,
      refetchInterval: 10000,
    }
  )
  const RetrieveDisplay = () => {
    return isLoadingOptions ? <Spinner /> : <Retrieve data={options as OptionsResponse} />
  }

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  return (
    // <Card className="flex justify-center h-full bg-white ">
      <div className="mx-7">
        <Tabs  variant='basic' onTabClick={handleTabClick} className={`bg-light-gray`}>
          <Tab title="Retrieve"  path="retrieve" component={<RetrieveDisplay />}/>
          <Tab title="Anonymize"  path="anonymize" component={<Anonymize /> }/>
          <Tab title="Delete"  path="delete" component={<Delete />}/>
        </Tabs>
      </div>
    // </Card>
  )
}

export default QueuesRoot;