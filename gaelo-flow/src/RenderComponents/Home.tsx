//create a homepage with the name of user connected and a button to go to the dashboard
// with a button lo logout and the name of the user connected

import Button from "./Button";

const Home = () => {    
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome username !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">You are connected.</p>
            //TODO : redirect route for logout aftre clicked on button logout
            <Button color="purple">Logout</Button>           
        </div>
    )
}

export default Home;