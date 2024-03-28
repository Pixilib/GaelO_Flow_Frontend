
import { Route, Routes } from "react-router-dom";
import General from "./general/General";
import JobRoot from "./jobs/JobRoot";
import AetCard from "./general/AetCard";
import QueuesRoot from "./queues/QueuesRoot";

const AdminRoot = () => {
    return (
        <div className="mt-10 size-full">
            <Routes>
                <Route path="general" element={<General />} />
                <Route path="/jobs" element={<JobRoot />} />
                <Route path="/aets" element={<AetCard aetData={[]} />} />
                <Route path="/queues" element={<QueuesRoot />} />
            </Routes>
        </div>
    )
}

export default AdminRoot