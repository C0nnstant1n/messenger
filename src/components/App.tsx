import * as React from "react";
import LeftColumn from "./LeftColumn/LeftColumn";
import MiddleColumn from "./MiddleColumn/MiddleColumn";
import RightColumn from "./RightColumn/RightColumn";

export default function App() {
  return (
    <div className='MainWrapper'>
      <LeftColumn />
      <MiddleColumn />
      <RightColumn />
    </div>
  );
}
