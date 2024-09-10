"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
import Search from "@/components/Search/Search";

const Rooms = () => {
    const [roomTypeFIlter, setRoomTypeFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get('searchQuery');
        const roomType = searchParams.get('roomType');

        if (roomType) setRoomTypeFilter(roomType);
        if(searchQuery) setSearchQuery(searchQuery);
    }, [searchParams]);

    async function fetchData() {
        return getRooms();
    }

    const {data, error, isLoading} = useSWR("get/hotelRooms", fetchData);

    if (error) throw new Error('Cannot fetch data');
    if (typeof data === undefined && !isLoading)
      throw new Error('Cannot fetch data');

    const filterRooms = (rooms: Room[]) => {
      return rooms.filter(room => {
        // Apply room type filter

        if (
          roomTypeFIlter &&
          roomTypeFIlter.toLowerCase() !== 'all' &&
          room.type.toLowerCase() !== roomTypeFIlter.toLowerCase()
        ) {
          return false;
        }

        // Apply search query filter

        if (
          searchQuery &&
          !room.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    };

    const filteredRooms = filterRooms(data || []);

    return (
      <div className="container mx-auto pt-10">
        <Search 
          roomTypeFilter={roomTypeFIlter}
          searchQuery={searchQuery}
          setRoomTypeFilter={setRoomTypeFilter}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex mt-20 justify-between flex-wrap">
              {filteredRooms.map(room => (
                <></>
              ))}
        </div>
      </div>
    );
};

export default Rooms