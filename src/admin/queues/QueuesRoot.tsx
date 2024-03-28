import Card, { CardBody, CardFooter, CardHeader } from "../../ui/Card";
import Spinner from "../../ui/Spinner";
import { Colors } from "../../utils/enums";
import QueuesForm from "./QueuesForm";


//! WIP - This is the root component for the Queues

const QueuesRoot = () => {
    // implement the logic to fetch the data from the API queues
    

    const isLoadingQueues = false;
  return (
    <div className="flex justify-center h-full mt-10">
      <Card className="bg-white">
        <CardHeader title='Queues' color={Colors.primary} />
        <CardBody className="bg-white">
            <div>
                Formulaire
            </div>
          {isLoadingQueues ? <Spinner /> : <QueuesForm />}
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  )
}

export default QueuesRoot;