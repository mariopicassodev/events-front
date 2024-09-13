'use client';
import { useState } from "react";
import Toast from "../Toast";
import { createReservation } from '@/services/create-reserve';
import { cancelReservation } from '@/services/cancel-reservation';
import { useReservations } from "@/hooks/useReservations";



export default function ReserveButton({ event, dictionary}) {

    const [toast, setToast] = useState({ message: "", type: "", visible: false });
    const { reservations, loading, refetch } = useReservations();

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };


    const reserve = async (event) => {

        createReservation(event.id).then(response => {
            if (response.status !== 200) {
                setToast({ message: `${response.status} ${response.data.errors[0].message}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.upcomingEvent.successReserve}`, type: "success", visible: true });
                refetch();
            }
        });
    }

    const cancel = async (event) => {
        const reservation = reservations.find(reservation => reservation.event.id === event.id);
        cancelReservation(reservation.id).then(response => {

            console.log('Response:', JSON.stringify(response));

            if (response.status !== 200) {
                setToast({ message: `${response.status} ${response.data.errors[0].message}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.upcomingEvent.successCancel}`, type: "success", visible: true });
                refetch();
            }
        });
    }

    console.log('Reservations:', reservations);
    const hasReservation = !loading && reservations.some(reservation => reservation.event.id === event.id);

    return (
        <div>
            {hasReservation ? (
                <button
                    onClick={() => cancel(event)}
                    className="btn btn-accent"
                    disabled={loading}
                >
                    {dictionary.upcomingEvent.cancel}
                </button>
            ) : (
                <button
                    onClick={() => reserve(event)}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {dictionary.upcomingEvent.reserve}
                </button>
            )}
            <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={handleCloseToast} />
        </div>
    );
}
