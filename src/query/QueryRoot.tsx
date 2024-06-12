import { Route, Routes } from "react-router-dom";
import SearchForm from "./SearchForm";



const QueryRoot = () => {



    return (
        <div>
            <Routes>
                <Route path="/" 
                element={
                    <SearchForm title={"Search"} className={`bg-light-gray`} onClose={() => console.log("close")} />
                } />
            </Routes>
        </div>
    )
}

export default QueryRoot;