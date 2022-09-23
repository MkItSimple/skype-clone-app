import React from "react";
import { BellIcon, ChatsIcon, ContactIcon, PhoneIcon } from "../svg/Icons";

type Props = {
  tabIndex: number;
  setTabIndex: (value: number) => void;
  notificationCount: number;
};
const Tabs = ({ tabIndex, setTabIndex, notificationCount }: Props) => {
  return (
    <div className="tabs">
      <div
        className={`tab ${tabIndex === 0 ? "active" : ""}`}
        onClick={() => setTabIndex(0)}
      >
        <ChatsIcon />
        <div>Chats</div>
        {notificationCount > 0 && (
          <div className="notification tab__notification">
            {notificationCount}
          </div>
        )}
      </div>
      <div
        className={`tab ${tabIndex === 1 ? "active" : ""}`}
        onClick={() => setTabIndex(1)}
      >
        <ContactIcon />
        <div>Contacts</div>
      </div>
      <div
        className={`tab ${tabIndex === 2 ? "active" : ""}`}
        onClick={() => setTabIndex(2)}
      >
        <PhoneIcon />
        <div>Calls</div>
      </div>
      <div
        className={`tab ${tabIndex === 3 ? "active" : ""}`}
        onClick={() => setTabIndex(3)}
      >
        <BellIcon />
        <div>Notifications</div>
      </div>
    </div>
  );
};

export default Tabs;
