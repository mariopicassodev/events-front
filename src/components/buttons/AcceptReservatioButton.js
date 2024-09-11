'use client';

import { useState } from "react";
import Toast from "../Toast";

import { acceptReservation } from '@/services/accept-reservation';

export default function AcceptReservationButton({ event, reservation, dictionary }) {

    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };

    const accept = async () => {
        acceptReservation(event.id, reservation.id).then(response => {
            if (response.status !== 200) {
                setToast({ message: `${response.status} ${response.data.errors[0].message}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.manageReservations.successAccept}`, type: "success", visible: true });
            }
        });
    }

    return (
        <div>
            <button
                onClick={() => accept()}
                className="btn btn-xs btn-primary mr-2"
                disabled={reservation.status === 'ACCEPTED'}
            >
                {dictionary.manageReservations.accept}
            </button>
            <Toast
                message={toast.message}
                type={toast.type}
                visible={toast.visible}
                onClose={handleCloseToast}
            />
        </div>
    );
}
