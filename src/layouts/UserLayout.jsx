import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/UserLayout.css";

const UserLayout = () => (
  <div className="user-layout">
    <Sidebar />
    <div className="user-layout-body">
      <Header />
      <main className="user-layout-main">
        <Outlet />
      </main>
    </div>
  </div>
);

export default UserLayout;
