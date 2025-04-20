import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user); // For use user data
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
  // Outlet is a placeholder for the child routes of this route.
}
