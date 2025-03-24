"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

const ReservationList = ({ bookings }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, idToDelete) => {
      return currentBookings.filter((booking) => booking.id !== idToDelete);
    }
  );
  const removedBookings = async (bookingId) => {
    optimisticDelete(bookingId);

    await deleteReservationAction(bookingId);
  };
  return (
    <>
      {" "}
      <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
          <ReservationCard
            booking={booking}
            key={booking.id}
            onDelete={removedBookings}
          />
        ))}
      </ul>
    </>
  );
};

export default ReservationList;
