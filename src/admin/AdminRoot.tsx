import { Route, Routes } from "react-router";
import General from "./general/General";
import JobRoot from "./jobs/JobRoot";
import QueuesRoot from "./queues/QueuesRoot";
import ModalitiesRoot from "./modalities/ModalitiesRoot";
import UsersRoot from "./users/UsersRoot";
import PeersRoot from "./peers/PeersRoot";
import LabelRoot from "./labels/LabelRoot";

const AdminRoot = () => {
    return (
        <div className="size-full" data-gaelo-flow="admin-root">
            <Routes>
                <Route path="/jobs" element={<JobRoot />} />
                <Route path="/modalities" element={<ModalitiesRoot />} />
                <Route path="/queues">
                    <Route path="*" element={<QueuesRoot />} />
                </Route>
                <Route path="/users">
                    <Route path="*" element={<UsersRoot />} />
                </Route>
                <Route path="/general">
                    <Route path="*" element={<General/>} />
                </Route>
                <Route path="/peers" element={<PeersRoot />} />
                <Route path="/labels" element={<LabelRoot />} />
            </Routes>
        </div>
    );
};

export default AdminRoot;
