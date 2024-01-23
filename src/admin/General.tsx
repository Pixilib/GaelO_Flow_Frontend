import { Colors } from '../utils/enums';
import Button from '../RenderComponents/Button';
import Card, { CardHeader, CardBody, CardFooter } from "../RenderComponents/Card";
import Check from "./../assets/check.svg?react";

import Restart from "./../assets/restart.svg?react";
import Shutdown from "./../assets/shutdown.svg?react";

const General = () => {
  return (
    <div className="flex-col h-screen p-8 bg-background">
      {/* Card Anonymization */}
      <Card className="flex-1 mb-6">
        <CardHeader title="Redis Setting" />
        <CardBody>
          <h3 className="text-xl">Progress</h3>
        </CardBody>
        <CardFooter>
          
        </CardFooter>
      </Card>

      <Card className="flex-1 mb-6">
        <CardHeader title="Orthanc Setting" />
        <CardBody>
          <h3 className="text-xl">Progress</h3>
        </CardBody>
        <CardFooter>
        <div className="flex items-center justify-center space-x-2">
                  <Button color={Colors.success}><Check /></Button>
          <Button color={Colors.orange}><Restart /></Button>
          <Button color={Colors.danger}><Shutdown /></Button>
        </div>

        </CardFooter>

      </Card>
    </div>
  );
};

export default General;
