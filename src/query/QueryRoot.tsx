import { Route, Routes } from "react-router-dom";
import Search from "./Search";



const QueryRoot = () => {
    return (
        <div>
            <Routes>
                <Route path="/" 
                element={
                    <Search title={"Search"} className={`bg-light`} />
                } />
            </Routes>
        </div>
    )
}

export default QueryRoot;