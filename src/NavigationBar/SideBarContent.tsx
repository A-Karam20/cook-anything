import {useState} from 'react';

type Props = {
    isSideBarOpen : Boolean
}

export const SideBar : React.FC<Props> = ({isSideBarOpen}) => {
    const [activeLink, setActiveLink] = useState<string>("");

    const linkClassName = (link : string) => {
        return `text-black ${
          activeLink === link ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
        } px-2 py-2 rounded-md text-lg font-sans`
      };

    console.log(isSideBarOpen);
    
    return(
        <div className={`bg-green-400 text-black w-64 px-4 py-20 shadow-md ${isSideBarOpen ? 'block' : 'hidden'}`} style={{ boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.2)"}}>
    {/* Sidebar content goes here */}
    <ul className="flex flex-col justify-center">
      <a href="/login/calendar" className={linkClassName("calendar")} onClick={(e) => {setActiveLink("calendar")}}>
        Calendar
      </a>
      <a href="/login/friends" className={linkClassName("friends")} onClick={(e) => {setActiveLink("friends")}}>
        Friends
      </a>
      <a href="/login/settings" className={linkClassName("settings")} onClick={(e) => {setActiveLink("settings")}}>
        Settings
      </a>
      <a href="/" className="text-black hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-lg font-sans">
        Log Out
      </a>
    </ul>
  </div>
    );
}