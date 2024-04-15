// import Card from "../../ui/Card";
import Spinner from "../../ui/Spinner";
import Tabs from '../../ui/menu/Tabs';
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
  // implement the logic to fetch the data from the API queues
  const { data: options, isPending: isLoadingOptions } = useCustomQuery<OptionsResponse>(
    ["options"],
    () => getOptions(),
    {
      enabled: true,
      refetchInterval: 10000,
    }
  )
  //create a component who will display QueuesForm or Spinner if the data is loading
  const RenderQueuesForm = () => {
    return isLoadingOptions ? <Spinner /> : <Retrieve data={options as OptionsResponse} />
  }

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  const tabs = [
    { title: 'retrieve', path: 'retieve', Component: () => <RenderQueuesForm /> },
    { title: 'anonymize', path: 'anonymize', Component: () => <Anonymize /> },
    { title: 'delete', path: 'delete', Component: () => <Delete /> },
  ]

  return (
    // <Card className="flex justify-center h-full bg-white ">
      <div className="mx-12 rounded-xl">
        <Tabs tabs={tabs} variant='basic' onTabClick={handleTabClick} className={`bg-white`} />
      </div>
    // </Card>
  )
}

export default QueuesRoot;