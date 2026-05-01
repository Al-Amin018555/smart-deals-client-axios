import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;