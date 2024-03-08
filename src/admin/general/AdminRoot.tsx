
import { Route, Routes } from "react-router-dom";
import General from "./General";
import JobRoot from "./JobRoot";

const AdminRoot = () => {
    return (
        <div className="size-full">
            <Routes>
                <Route path="general" element={<General />} />
                <Route path="/jobs" element={<JobRoot />} />
            </Routes>
        </div>
    )
}

export default AdminRoot