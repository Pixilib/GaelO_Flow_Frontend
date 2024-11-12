import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../reducers/UserSlice';
import { Card, CardBody, CardHeader } from "../../ui";
import { Colors } from "../../utils";
import CardAnon from "./CardAnon";
import CardExport from "./CardExport";
import Cardretrieve from "./Cardretrieve";

const Dashboard = () => {
  const userState = useSelector((state: RootState) => state.user) as UserState;
  const username = `${userState.firstName} ${userState.lastName}`;

  return (
    <div className="p-8 bg-background size-full">

      <h1 className="text-3xl font-medium text-white">Bonjour, {username}</h1>
      <img
        src="hello.svg"
        alt="Hello Emoji"
        className="w-10 h-10"

      />
      <Card>
        <CardBody
          color={Colors.white}
          roundedBottomLeft
          roundedTopLeft
          roundedBottomRight
          roundedTopRight
        >
          <div className="flex items-center gap-2 mb-4">


          </div>
          <div className="flex gap-6">
            {/* Card Anonymisation */}
            <CardAnon />

            {/* Card Export */}
            <CardExport />

            {/* Card Retrieve */}
            <Cardretrieve />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
