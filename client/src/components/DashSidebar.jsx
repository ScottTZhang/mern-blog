import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // For use user data
import { signoutSuccess } from "../redux/user/userSlice"; // For use user reducer function

export default function DashSidebar() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // For use user data
  const [tab, setTab] = useState("");

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
        <SidebarItemGroup>
          <SidebarItem active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark" onClick={() => navigate('/dashboard?tab=profile')}>
            Profile
          </SidebarItem>
          <SidebarItem onClick={handleSignout} icon={HiArrowRight} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
