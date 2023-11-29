import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as LogoIcon } from "../../../../assets/icons/sidebar-head-logo.svg";
import UserAvatar from "../../../../assets/images/user-avatar.jpg";

const SidebarHead = ({ closeSidebar }) => {
  // const { user } = useSelector((state) => state.user);
  // const { profileImg } = useSelector((state) => state.profileImg);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userProfileImg = JSON.parse(localStorage.getItem("userProfileImg"));


  return (
    <div className="sidebar-head">
      <div className="top">
        <div>
          <LogoIcon />
        </div>

        <div className="close-sidebar-icon" onClick={() => closeSidebar()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* <h3 className="name">{userData?.fullName}</h3>
      <p className="email">{userData?.email}</p> */}
    </div>
  );
};

export default SidebarHead;
