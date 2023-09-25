
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./resources/global.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Spinner from "./Components/spinner";
import { useSelector } from "react-redux";
import Landing from "./Landing";
import Analytics from "./pages/organisation/organisationAnalytics";
import OrganisationInvent from "./pages/organisation/organisationInventory";
import organisationProfile from "./pages/organisation/organisationProfile";
import DonarProfile from "./pages/donar/donarProfile";
import DonorHome from "./pages/donar/donorhome";
import RecipientProfile from "./pages/recipient/recipientprofile";
import RecipientHome from "./pages/recipient/recipienthome";
import RecipientBloodRequest from "./pages/recipient/recipientbloodrequest";
import RecipientBloodStatus from "./pages/recipient/recipientStatus";
import DonorBloodRequest from "./pages/donar/donorbloodrequest";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Spinner />}

      <BrowserRouter>
        <Routes>
          <Route
            path="/donar/profile"
            element={
              <ProtectedRoute>
                <DonarProfile/>
              </ProtectedRoute>
            }
            
          />
          {/* /recipient/profile  /recipient/home*/}

          <Route
            path="/donar/home"
            element={
              <ProtectedRoute>
                <DonorHome/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/donar/bloodRequest"
            element={
              <ProtectedRoute>
                <DonorBloodRequest/>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/recipient/home"
            element={
              <ProtectedRoute>
                <RecipientHome/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipient/profile"
            element={
              <ProtectedRoute>
                <RecipientProfile/>
              </ProtectedRoute>
            }
            
          />
          <Route
            path="/recipient/bloodRequest"
            element={
              <ProtectedRoute>
                <RecipientBloodRequest/>
              </ProtectedRoute>
            }
            
          />
           <Route
            path="/recipient/status"
            element={
              <ProtectedRoute>
                <RecipientBloodStatus/>
              </ProtectedRoute>
            }
            
          />
          

        
          <Route
            path="/organisation/profile"
            element={
              <ProtectedRoute>
                <organisationProfile />
              </ProtectedRoute>
            }
          />
           <Route
            path="/organisation/inventory"
            element={
              <ProtectedRoute>
                <OrganisationInvent/>
              </ProtectedRoute>
            }
          />
           <Route
            path="/organisation/analytics"
            element={
              <ProtectedRoute>
               <Analytics />
              </ProtectedRoute>
            }
          />


          <Route
            path="/landing"
            element={
              <PublicRoute>
                <Landing></Landing>
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
