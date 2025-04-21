import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashSidebar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark" onClick={() => navigate('/dashboard?tab=profile')}>
            Profile
          </SidebarItem>
          <SidebarItem icon={HiArrowRight} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
