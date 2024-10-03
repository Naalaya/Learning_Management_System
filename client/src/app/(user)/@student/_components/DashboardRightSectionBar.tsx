import Calendar from "../../components/calendar";
import Schedule from "./schedule";
import UserCard from "./userCard";
import React from "react";

function RightSectionBar() {
  return (
    <div className=" flex flex-col gap-1 overflow-hidden rounded-2xl">
      {/* Add more components in this case*/}
      <UserCard />
      <Calendar />
      <Schedule />
    </div>
  );
}

export default RightSectionBar;
