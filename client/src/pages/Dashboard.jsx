import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardCom from "../components/DashboardCom";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("dashboard");
    }
  }, [location.search]);
  //The useEffect hook is used to perform side effects in functional components. In this case, it runs whenever the location.search value changes.
  // [location.search] ensures that the effect is triggered only when the query string in the URL changes, avoiding unnecessary re-renders.

  return (
    <div className="minh-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* posts... */}
      {tab === "posts" && <DashPosts />}
      {/*users */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard component */ }
      {tab === "dashboard" && <DashboardCom />}
    </div>
  );
}
