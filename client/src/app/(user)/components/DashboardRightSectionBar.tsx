import Calendar from "./calendar";
import Schedule from "./schedule";
import React from "react";

function RightSectionBar() {
  return (
    <div className="flex flex-col gap-1 max-w-80 w-screen mx-auto overflow-y-auto rounded-2xl">
      {/* Add more components in this case*/}
      <Calendar />
      <Schedule />
      <Schedule />
    </div>
  );
}

export default RightSectionBar;
