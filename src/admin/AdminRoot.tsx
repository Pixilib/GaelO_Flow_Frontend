
import { Route, Routes } from "react-router-dom";
import General from "./general/General";
import JobRoot from "./jobs/JobRoot";

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