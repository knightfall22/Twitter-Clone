import Image from "next/image"
import SidebarLink from "./SidebarLink"
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";


function Sidebar() {
  const {data: session} = useSession() 
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:[340px] p-2 fixed h-full'>
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 ">
                <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
            </div>
            <div className="space-y-1.5 mt-4 mb-2.5 xl:ml:24">
                <SidebarLink Text="Home" Icon={HomeIcon} active />
                <SidebarLink Text="Explore" Icon={HashtagIcon} />
                <SidebarLink Text="Notifications" Icon={BellIcon} />
                <SidebarLink Text="Messages" Icon={InboxIcon} />
                <SidebarLink Text="Bookmarks" Icon={BookmarkIcon} />
                <SidebarLink Text="Lists" Icon={ClipboardListIcon} />
                <SidebarLink Text="Profile" Icon={UserIcon} />
                <SidebarLink Text="More" Icon={DotsCircleHorizontalIcon} />
            </div>
            <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full
                w-56 h-[47px] text-base font-bold hover:bg-[#1a8cd8]">Tweet</button>

            <div className="text-[#d9d9d9] flex items-center justify-center xl:ml-auto xl:-mr-5 mt-auto hoverAnimation">
                <img 
                    src={session.user.image}
                    className="h-10 w-10 rounded-full xl:mr-2.5"/>
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session.user.name}</h4>
                    <p className="text-[#6e767d]">@{session.user.tag}</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
            </div>
            
    </div>
  )
}

export default Sidebar