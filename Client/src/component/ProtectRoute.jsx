import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library
function ProtectedRoute() {

    const isAuthenticated = () => {
      // Check for authentication token or user data in localStorage/sessionStorage
      const token = Cookies.get('auth');
      return !!token; // Returns true if token exists, false otherwise
    };
  
    // If authenticated, render the child routes
    // Otherwise, redirect to login page
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
  }
  
  export default ProtectedRoute;