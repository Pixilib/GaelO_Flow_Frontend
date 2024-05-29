
import { Route, Routes } from "react-router-dom";
import General from "./general/General";
import JobRoot from "./jobs/JobRoot";
import QueuesRoot from "./queues/QueuesRoot";
import ModalitiesRoot from "./modalities/ModalitiesRoot";
import UsersRoot from "./users/UsersRoot";
import PeersRoot from "./peers/PeersRoot";
import LabelsRoot from "./labels/LabelsRoot";

const AdminRoot = () => {
    return (
        <div className="size-full">
            <Routes>
                <Route path="/general" element={<General />} />
                <Route path="/jobs" element={<JobRoot />} />
                <Route path="/modalities" element={<ModalitiesRoot />} />
                <Route path="/queues/*" element={<QueuesRoot />} />
                <Route path="/users/*" element={<UsersRoot />} />
                <Route path="/labels/*" element={<LabelsRoot />} />
                <Route path="/peers" element={<PeersRoot/>} />
            </Routes>
        </div>
    )
}

export default AdminRoot