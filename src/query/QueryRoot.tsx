import { Route, Routes } from "react-router-dom";
import QueryForm from "./QueryForm";


const QueryRoot = () => {



    return(
        <div>
            <h1>QueryRoot</h1>
        <Routes>
        <Route path="/query" element={<QueryForm />} />
        </Routes>
        </div>
    )
}

export default QueryRoot;