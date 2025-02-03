import Navbar from "../Components/Navbar";
import { FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";


export default function profile({ children }) {
    return (
        <div>
            <Navbar tabs={[ {tab: 'Home', link: '/home', icon: <FaHome />}, {tab: 'Message', link: '/messages', icon: <FaMessage />}, {tab: 'notification', link: '/notification', icon: <IoMdNotifications />} ,{tab: 'profile', link: '/profile', icon: <FaUser />}  ]} />
            <main className="p-6">{children}</main>
        </div>
    );
}