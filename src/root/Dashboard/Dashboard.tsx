import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../reducers/UserSlice';
import { Card, CardBody } from "../../ui";
import CardAnon from "./CardAnon";
import CardExport from "./CardExport";
import Cardretrieve from "./Cardretrieve";
import { Colors } from "../../utils/enums";


const Dashboard = () => {
  const userState = useSelector((state: RootState) => state.user) as UserState;
  const username = `${userState?.firstName} ${userState?.lastName}`;

  return (
    <div className="p-8 bg-background size-full">
      <h1 className="flex items-center mb-10 overflow-hidden text-4xl font-medium text-transparent bg-gradient-to-r from-orange-500 via-indigo-400 to-violet-800 bg-clip-text whitespace-nowrap animate-typing">
        Bonjour, {username}
        <img
          src="hello.svg"
          alt="Hello Emoji"
          className="w-10 h-10 ml-2" 
        />
      </h1>


      <Card>
      <CardBody color={Colors.white} roundedBottomLeft roundedTopLeft roundedBottomRight roundedTopRight>
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
