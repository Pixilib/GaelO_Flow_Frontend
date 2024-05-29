import { Route, Routes } from "react-router-dom";
import Labels from "./Labels";




const LabelsRoot = () => {
    return (
       <Routes>
        <Route path="/" element={<Labels/>} />
       </Routes> 
    );
}
export default LabelsRoot;