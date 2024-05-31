import { Route, Routes } from "react-router-dom";

import General from "./general/General";
import JobRoot from "./jobs/JobRoot";
import QueuesRoot from "./queues/QueuesRoot";
import ModalitiesRoot from "./modalities/ModalitiesRoot";
import UsersRoot from "./users/UsersRoot";
import PeersRoot from "./peers/PeersRoot";
import LabelRoot from "./Labels/LabelRoot";

const AdminRoot = () => {
    return (
        <div 
        className="mt-10 size-full bg-light-gray"
        data-gaelo-flow="admin-root"
        >
            <Routes>
                <Route path="/general" element={<General />} />
                <Route path="/jobs" element={<JobRoot />} />
                <Route path="/modalities" element={<ModalitiesRoot />} />
                <Route path="/queues/*" element={<QueuesRoot />} />
                <Route path="/users/*" element={<UsersRoot />} />
                <Route path="/peers" element={<PeersRoot />} />
                <Route path="/labels" element={<LabelRoot />} />
            </Routes>
        </div>
    )
}

export default AdminRoot;
