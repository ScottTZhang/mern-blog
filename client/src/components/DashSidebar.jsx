import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // For use user data
import { signoutSuccess } from "../redux/user/userSlice"; // For use user reducer function
import { useSelector } from "react-redux"; // For use user data

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // For use user data
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user); // For use user data
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log("Signout successful:", data);
        dispatch(signoutSuccess(data));
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <SidebarItem
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            onClick={() => navigate("/dashboard?tab=profile")}
          >
            Profile
          </SidebarItem>
          {currentUser.isAdmin && (
            <SidebarItem
              active={tab === "posts"}
              icon={HiDocumentText}
              label={"Posts"}
              labelColor="dark"
              onClick={() => navigate("/dashboard?tab=posts")}
            >
              Posts
            </SidebarItem>
          )}
          <SidebarItem
            onClick={handleSignout}
            icon={HiArrowRight}
            className="cursor-pointer"
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
