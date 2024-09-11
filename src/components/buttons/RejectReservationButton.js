'use client';

import { useState } from "react";
import Toast from "../Toast";

import { rejectReservation } from '@/services/reject-reservation';

export default function RejectReservationButton({ reservation, dictionary }) {

    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };

    const reject = async () => {
        rejectReservation(reservation.id).then(response => {
            if (response.status !== 200) {
                setToast({ message: `${response.status} ${response.data.errors[0].message}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.manageReservations.successReject}`, type: "success", visible: true });
            }
        });
    }

    return (
        <div>
            <button
                onClick={() => reject()}
                className="btn btn-xs btn-accent"
                disabled={reservation.status === 'REJECTED'}
            >
                {dictionary.manageReservations.reject}
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
