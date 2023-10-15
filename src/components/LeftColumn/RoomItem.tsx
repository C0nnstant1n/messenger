import * as React from "react";
import { Room } from "../models/IRooms";
import { FC } from "react";

interface RoomItemProps {
  room: Room;
}

const RoomItem: FC<RoomItemProps> = ({ room }) => {
  return (
    <li>
      {room.name} <button>X</button>
    </li>
  );
};

export default RoomItem;
