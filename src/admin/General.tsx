import { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../RenderComponents/Card';

const General = () => {
  const [address, setAddress] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //TODO: Fix problems with cards #73 
  return (
    <div className="flex-col h-screen p-8 bg-background">
      {/* Card Redis Setting */}
      <Card className="flex-1 mb-6">
        <CardHeader title="Redis Setting" />
        <CardBody>
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
              className="w-full p-2 mt-1 border rounded-md"
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
              className="w-full p-2 mt-1 border rounded-md"
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
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </CardBody>
        <CardFooter>
          
        </CardFooter>
      </Card>

      <Card className="flex-1 mb-6">
        <CardHeader title="Another Card" />
        <CardBody>
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
                className="w-full p-2 mt-1 border rounded-md"
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
                className="w-full p-2 mt-1 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
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
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </CardBody>
        <CardFooter>
          {/**/}
        </CardFooter>
      </Card>

      {/* ... (Other cards) */}
    </div>
  );
};

export default General;
