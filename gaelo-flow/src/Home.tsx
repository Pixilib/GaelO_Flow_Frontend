
import { useDispatch } from "react-redux";
import { logout } from "./reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import Button from "./RenderComponents/Button";
import SideBar from "./RenderComponents/NavBar/SideBar";




const Home = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        //TODO : handle logout
        dispatch(logout());
        navigate('/');
    }
    return (
        <div>
            <SideBar>
                {/* <Button color="purple" onClick={handleLogout}>Logout</Button> */}
            </SideBar>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">You are connected.</p>
            //TODO : redirect route for logout aftre clicked on button logout
            <Button color="purple" onClick={handleLogout}>Logout</Button>
        </div>




    )
}

export default Home;