import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../Redux/userSlice";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const REACT_BASE_URL = "https://backend-blood-unity-dev.onrender.com"
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(process.env.REACT_APP_BASE_URL+"/api/user/current-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        console.log("inside success");
        dispatch(setUser(response?.data.user));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return <DefaultLayout>{children}</DefaultLayout>;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;


// import React from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setUser } from "../Redux/userSlice";
// import { showLoading, hideLoading } from "../Redux/alertsSlice";
// import DefaultLayout from "./DefaultLayout";
// function ProtectedRoute(props) {
//   const { user } = useSelector((state) => state.user);
//   const { loading } = useSelector((state) => state.alerts);
//   console.log(user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const getUser = async () => {
//     try {
//       dispatch(showLoading());
//       const response = await axios.get(
//         "/api/user/current-user",
//         //need to handle token not found case
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (response.data.success) {
//         console.log("inside success");
//         console.log(user);
//         dispatch(setUser(response?.data.user));
//       } else {
//         localStorage.clear();
//         navigate("/login");
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       localStorage.clear();
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       getUser();
//     }
//   }, [user]);

//   if (localStorage.getItem("token")) {
//     return props.children;
//   } else {
//     return <Navigate to="/" />;
//   }
//   return <div>{!loading && <DefaultLayout>{children}</DefaultLayout>}</div>;
// }

// export default ProtectedRoute;
