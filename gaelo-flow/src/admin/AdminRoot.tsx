
import { Route, Routes } from "react-router-dom";
import General from "./General";

const AdminRoot = () => {
    return (
        <div className="h-full w-full">
            <Routes>
                <Route path="/general" element={<General />} />
            </Routes>
            My Admin Component 2
        </div>
    )
}

export default AdminRoot