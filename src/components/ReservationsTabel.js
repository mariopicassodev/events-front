'use client';
import { useEffect, useState } from 'react';
import Toast from "./Toast";
import { acceptReservation } from '@/services/accept-reservation';
import { rejectReservation } from '@/services/reject-reservation';
import { formatTimestamp } from '@/utils/timestamp';

export default function ReservationsTable({ event, dictionary }) {
    const [reservations, setReservations] = useState(event.reservations);
    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };



    const handleAccept = (reservation_id) => {
        acceptReservation(event.id, reservation_id).then(response => {
            if (response.status !== 200) {
                setToast({ message: `${response.status} ${response.data.errors[0].message}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.manageReservations.successAccept}`, type: "success", visible: true });
                setReservations(reservations.map(reservation =>
                    reservation.id === reservation_id ? { ...reservation, status: 'ACCEPTED' } : reservation
                ));
            }
        });
    }
    const handleReject = (reservation_id) => {
        rejectReservation(reservation_id).then(response => {
            if (response.status !== 200) {
                setToast({ message: `${response.status} ${response.data.errors[0].message}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.manageReservations.successReject}`, type: "success", visible: true });
                setReservations(reservations.map(reservation =>
                    reservation.id === reservation_id ? { ...reservation, status: 'REJECTED' } : reservation
                ));
            }
        });
    }


    return (
        <div>
            <h2 className='text-l font-bold mb-2'>{event.name}</h2>

            <div className="flex justify-between mb-4">
                <p>{formatTimestamp(event.schedule)}</p>
                <p>{`1/${event.maxCapacity}`}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{dictionary.manageReservations.name}</th>
                            <th>{dictionary.manageReservations.email}</th>
                            <th>{dictionary.manageReservations.status}</th>
                            <th>{dictionary.manageReservations.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.user.name}</td>
                                <td>{reservation.user.email}</td>
                                <td>
                                    <div className={`badge ${reservation.status === 'PENDING' ? 'badge-neutral' : reservation.status === 'ACCEPTED' ? 'badge-primary' : 'badge-accent'}`}>
                                        {reservation.status}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAccept(reservation.id)}
                                            className="btn btn-xs btn-primary mr-2"
                                            disabled={reservation.status !== 'PENDING'}
                                        >
                                            {dictionary.manageReservations.accept}
                                        </button>
                                        <button
                                            onClick={() => handleReject(reservation.id)}
                                            className="btn btn-xs btn-accent"
                                            disabled={reservation.status === 'REJECTED'}
                                        >
                                            {dictionary.manageReservations.reject}
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Toast
                    message={toast.message}
                    type={toast.type}
                    visible={toast.visible}
                    onClose={handleCloseToast}
                />
            </div>
        </div>
    );
}
