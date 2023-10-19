import * as React from "react";
import { Room } from "../models/IRooms";
import { FC } from "react";

interface RoomItemProps {
  room: Room;
  remove: (room: Room) => void;
  edit: (room: Room) => void;
}

const RoomItem: FC<RoomItemProps> = ({ room, remove, edit }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    remove(room);
  };
  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = prompt("Enter Title") || "";
    edit({ ...room, name });
  };

  return (
    <>
      <li>
        {room.name} <button onClick={handleEdit}>E</button>
        <button onClick={handleRemove}>X</button>
      </li>
    </>
  );
};

export default RoomItem;
