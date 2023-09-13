import React from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteUser } from "../Redux/userSlice";
import { useDispatch} from "react-redux";
import Logo from "../assets/logo.png"
import { Badge } from "antd";



function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed,setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const recipientMenu=[
    {
      name: "Home",
      path: "/recipient/home",
     
    },
    {
      name: "Profile",
      path: "/recipient/profile",
     
    },
    
    {
      name: "Blood Request",
      path: "/recipient/bloodRequest",
      
    },
    {
      name: "request status",
      path: "/recipient/status",
     
    },
    {
      name: "Logout",
      path: "/logout",
     
    },

  ]
  const donarMenu=[
    {
      name: "Home",
      path: "/donar/home",
      
     
    },

    {
      name: "Profile",
      path: "/donar/profile",
     
    },
    
    {
      name: "Blood Request",
      path: "/donar/bloodRequest",
      
    },
    {
      name: "Analytics",
      path: "/donar/analytics",
     
    },
    {
      name: "Logout",
      path: "/logout",
     
    },

  ]
  const organisationMenu=[
    
    {
      name: "Profile",
      path: "/organisation/profile",
     
    },
    
    {
      name: "Inventory",
      path: "/organisation/inventory",
      
    },
    {
      name: "Analytics",
      path: "/organisation/analytics",
     
    },
    {
      name: "Logout",
      path: "/logout",
     
    },

  ]
  const adminMenu = [
    {
      name: "Registation",
      path: "/admin/registration",
     
    },
    
    {
      name: "Blood Request",
      path: "/recipient/bloodRequest",
      
    },
    {
      name: "Request Status",
      path: "/recipient/analytics",
     
    },
    {
      name: "Logout",
      path: "/logout",
     
    },
   
  ];
  const menuToBeRendered = user?.role === 'organisation' ? organisationMenu :
  user?.role === 'admin' ? adminMenu :
   user?.role === 'recipient' ? recipientMenu :donarMenu;
  
  const role = user?.role;
  const activeRoute = window.location.pathname;

  return (
    <div className="layout-parent">
      <div className="sidebar">
      {!collapsed &&<span>
      <div className="sidebar-header">
      
      <div><img src={Logo} alt="Logo" className="logo" /></div>
            
          </div>
          </span>}
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => (
        
        <div
        className={`${
          activeRoute === item.path ? 'active-menu-item ' : ''
        }menu-item`}
      >
              <div key={index}>
                <i className={item.icon}></i>
                {!collapsed &&
                <span
                  
                  onClick={() => {
                    if (item.path ==="/logout"){
                      localStorage.removeItem("token")
                      dispatch(deleteUser())
                      
                      navigate("/landing")
                    }else{
                    navigate(item.path);
                    }
                  }}
                >
                  {item.name}
                </span>}
              </div>
            </div>
            
          ))}
        </div>
        
      </div>
      

      <div className="body">
        <div className="header">
          <div>
        {!collapsed ? (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                class="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
              
            )}
        </div>
        <div className="body-right">
        <div >
                <Badge
                  // count={user?.UnseenNotification.length}
                  onClick={() => navigate("/notifications")}
                >
                  <i className="ri-notification-2-line header-action-icon mr-2 px-4"></i>
                </Badge>
              </div>
        <div >
          <p className="usersname"><i class="ri-user-2-fill"></i>&nbsp;&nbsp;{ user?.role === 'organisation' ? user?.organisationName :user?.name}&nbsp;<span class="badge badge-primary">{role}</span></p>
        </div>
        </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
