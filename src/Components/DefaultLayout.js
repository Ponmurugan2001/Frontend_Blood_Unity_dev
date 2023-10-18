import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteUser } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import Logo from "../assets/logo_white.png";
import { Badge } from "antd";
import "../resources/layout.css";
import request_img from "../assets/request white.png";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const recipientMenu = [
    {
      name: "Home",
      path: "/recipient/home",
      icon: "ri-home-3-line"
    },
    {
      name: "Profile",
      path: "/recipient/profile",
      icon:"ri-user-3-line"
    },
    {
      name: "Blood Request",
      path: "/recipient/bloodRequest",
      icon: "ri-contrast-drop-2-line"

    },
    {
      name: "request status",
      path: "/recipient/status",
      icon: "ri-funds-line"
    },
    {
      name: "Logout",
      path: "/logout",
      icon:"ri-logout-circle-r-line"
    },
  ];

  const donarMenu = [
    {
      name: "Home",
      path: "/donar/home",
      icon: "ri-home-3-line"
    },
    {
      name: "Profile",
      path: "/donar/profile",
      icon:"ri-user-3-line"
    },
    {
      name: "Blood Request",
      path: "/donar/bloodRequest",
      icon:"ri-water-flash-line"
    },
    {
      name: "Analytics",
      path: "/donar/analytics",
      icon:"ri-bar-chart-2-line"
    },
    {
      name: "Logout",
      path: "/logout",
      icon:"ri-logout-circle-r-line"
    },
  ];

  const organisationMenu = [
    {
      name: "Profile",
      path: "/organisation/profile",
      icon:"ri-user-3-line"
    },
    {
      name: "Inventory",
      path: "/organisation/inventory",
      icon: "ri-file-list-3-line"
    },
    {
      name: "Analytics",
      path: "/organisation/analytics",
      icon: "ri-bar-chart-2-line"
    },
    {
      name: "Logout",
      path: "/logout",
      icon:"ri-logout-circle-r-line"
    },
  ];

  const adminMenu = [
    {
      name: "Registation",
      path: "/admin/registration",
      icon: "ri-team-line"
    },
    {
      name: "Successfull Donation",
      path: "/admin/successfull/donation",
      icon:"ri-check-double-line"
    },
    {
      name: "Logout",
      path: "/logout",
      icon:"ri-logout-circle-r-line"
    },
  ];

  const noUserMenu = [
    {
      name: "Home",
      path: "/landing",
      icon: "ri-home-3-line"
    },
  ];

  const menuToBeRendered =
    user?.role === "organisation"
      ? organisationMenu
      : user?.role === "admin"
      ? adminMenu
      : user?.role === "recipient"
      ? recipientMenu
      : user?.role === "donor"
      ? donarMenu
      : noUserMenu;

  const role = user?.role;
  const activeRoute = window.location.pathname;

  return (
    <div className={`layout-parent ${windowWidth <= 768 ? "mobile" : ""}`}>
      <div className="sidebar">
        {!collapsed && (
          <span>
            <div className="sidebar-header">
              <div>
                <img src={Logo} alt="Logo" className="logo" />
              </div>
            </div>
          </span>
        )}
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => (
            <div
              className={`${
                activeRoute === item.path ? "active-menu-item " : ""
              }menu-item`}
              key={index}
            >
              <div>
                <i className={item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        dispatch(deleteUser());
                        navigate("/landing");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
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
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
          </div>
          <div className="body-right">
            <div>
              <Badge onClick={() => navigate("/notifications")}>
                <i className="ri-notification-2-line header-action-icon mr-2 px-4"></i>
              </Badge>
            </div>
            <div>
              <p className="usersname">
                <i className="ri-user-2-fill"></i>&nbsp;&nbsp;
                {user?.role === "organisation"
                  ? user?.organisationName
                  : user?.name}
                &nbsp;<span className="badge badge-primary">{role}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
