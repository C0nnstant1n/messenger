import * as React from "react";
import { roomsApi } from "../service/RoomsService";
import RoomItem from "./RoomItem";
import { Room } from "../models/IRooms";

export default function LeftColumn() {
  const { data: rooms, error, isLoading } = roomsApi.useFetchAllRoomsQuery(10);
  const [createRoom, {}] = roomsApi.useCreateRoomMutation();
  const [deleteRoom, {}] = roomsApi.useDeleteRoomMutation();
  const [editRoom, {}] = roomsApi.useEditRoomMutation();
  const roomCreate = async () => {
    const name = prompt();
    await createRoom({ name } as Room);
  };

  const handleRemove = (room: Room) => {
    deleteRoom(room);
  };

  const handleEdit = (room: Room) => {
    editRoom(room);
  };

  return (
    <>
      <nav className='leftColumn'>
        <h3>Комнаты</h3>
        <ul>
          {isLoading && <h2>Загрузка...</h2>}
          {error && <h2>Ошибка Сети</h2>}
          {rooms &&
            rooms.results.map((room) => (
              <RoomItem
                key={room.id}
                edit={handleEdit}
                remove={handleRemove}
                room={room}
              />
            ))}
        </ul>
        {/* {% if user.is_authenticated %} */}
        <div className='itc-select' id='select-1'>
          {/* <!-- Кнопка для открытия выпадающего списка --> */}
          <button
            id='add-user'
            type='button'
            className='itc-select__toggle'
            name='member'
            value=''
            data-select='toggle'
            data-index='-1'
          >
            Добавить участника
          </button>
          {/* <!-- Выпадающий список --> */}
          <div className='itc-select__dropdown'>
            <ul className='itc-select__options'></ul>
          </div>
        </div>
        <button className='room-button' onClick={roomCreate}>
          Создать комнату
        </button>
      </nav>
    </>
  );
}
