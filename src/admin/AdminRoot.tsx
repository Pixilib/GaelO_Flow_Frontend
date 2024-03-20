
import { Route, Routes } from "react-router-dom";
import General from "./general/General";
import JobRoot from "./jobs/JobRoot";
import AetCard from "./general/AetCard";

const AdminRoot = () => {
    return (
        <div className="size-full">
            <Routes>
                <Route path="general" element={<General />} />
                <Route path="/jobs" element={<JobRoot />} />
                <Route path="/aets" element={<AetCard aetData={[]} />} />
            </Routes>
        </div>
    )
}

export default AdminRoot