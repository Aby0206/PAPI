import React , {useState} from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar";
import AppHeader from "../../components/app-header";
import Footer from "../../components/footer";
import { StyledDashboardLayout } from "./styledComponents";

const DashboardLayout: React.FC = () => {
const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); 
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () =>{
    setDrawerOpen(!isDrawerOpen);
  }

  return (
    <StyledDashboardLayout>
      <AppHeader toggleSidebar={toggleSidebar} isDrawerOpen={isDrawerOpen} />
      {isSidebarOpen && <SideBar  isSidebarOpen={isSidebarOpen} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} /> }
      <div className={`child-container ${!isDrawerOpen?'closed':''}`}> 
        <div className="oulet-container">
          <Outlet />
        </div>
        <Footer layout="dashboard"/>
      </div> 
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
