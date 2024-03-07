
import { Route, Routes } from "react-router-dom";
import General from "./General";
import JobInstances from "./JobsInstances";

const AdminRoot = () => {
    return (
        <div className="size-full">
            <Routes>
                <Route path="general" element={<General />} />
                <Route path="/jobs" element={<JobInstances />} />
            </Routes>
        </div>
    )
}

export default AdminRoot