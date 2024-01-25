import { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../RenderComponents/Card';
import Button from "../RenderComponents/Button";
import { Colors } from "../utils/enums";
import Check from '../assets/check.svg?react';
import Restart from '../assets/restart.svg?react';
import Shutdown from '../assets/shutdown.svg?react';

const General = () => {
  const [address, setAddress] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex-col h-screen p-8 bg-background">
    {/* Card Redis Setting */}
    <Card className="flex-1 mb-6">
      <CardHeader title="Redis Setting" />
      <CardBody>
        <div className="flex justify-center">
          <div className="w-1/2">
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full p-2 mt-1 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                Port
              </label>
              <input
                type="text"
                id="port"
                name="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="block w-full p-2 mt-1 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 mt-1 border rounded-md"
              />
            </div>
          </div>
        </div>

        </CardBody>
        <CardFooter>
          
        </CardFooter>
      </Card>

      <Card className="flex-1 mb-6">
  <CardHeader title="Orthanc Setting" />
  <CardBody>
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="flex mb-4">
          <div className="flex-1 mr-2">
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="flex-1 ml-2">
            <label htmlFor="port2" className="block text-sm font-medium text-gray-700">
              Port
            </label>
            <input
              type="text"
              id="port2"
              name="port2"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="block w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex-1 mr-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-2 mt-1 border rounded-md"
            />
          </div>
          <div className="flex-1 ml-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </CardBody>
  <CardFooter className="flex justify-center">
  <div className="flex items-center space-x-2">
    <Button color={Colors.success}><Check /></Button>
    <Button color={Colors.orange}><Restart/></Button>
    <Button color={Colors.danger}><Shutdown /></Button>
  </div>
</CardFooter>
</Card>


    </div>
  );
};

export default General;
