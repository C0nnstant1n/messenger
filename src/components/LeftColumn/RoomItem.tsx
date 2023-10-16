import * as React from "react";
import { Room } from "../models/IRooms";
import { FC } from "react";

interface RoomItemProps {
  room: Room;
  remove: (room: Room) => void;
}

const RoomItem: FC<RoomItemProps> = ({ room, remove }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    remove(room);
  };

  return (
    <li>
      {room.name} <button onClick={handleRemove}>X</button>
    </li>
  );
};

export default RoomItem;
