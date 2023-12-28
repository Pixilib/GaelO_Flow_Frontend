import { UserState } from "@/reducers/UserSlice";
import AnonymousRoot from "./AnonymousRoot"
import Root from "./Root"
import { useSelector } from 'react-redux';


//create a component if the user is connected display Root else display AnonymousRoot
const AuthenticatorRoot = () => {
    const isLogged = useSelector((state:UserState) => state.isLogged);
    return (
        <>
            { isLogged? <Root/> : <AnonymousRoot/>}
        </>
    )
}
export default AuthenticatorRoot