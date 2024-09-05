"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { getRooms } from "@/libs/apis";

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

    if (error)
    
  return (
    <div>Rooms</div>
  )
}

export default Rooms