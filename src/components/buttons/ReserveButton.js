'use client';
import { useState } from "react";
import Toast from "../Toast";
import { createReservation } from '@/services/create-reserve';

export default function ReserveButton({ event, dictionary}) {

    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };


    const reserve = async () => {
        console.log('Reserve button clicked');

        createReservation(event.id).then(response => {
            if (response.status !== 200) {
                setToast({ message: `Error reserving event\n ${response.status}: ${response.statusText}`, type: "error", visible: true });
                console.error(JSON.stringify(response));
            }
            else {
                setToast({ message: `${dictionary.upcomingEvent.successReserve}`, type: "success", visible: true });
            }
        });
    }

    return (
        <div>
            <button onClick={() => reserve(event)} className="btn btn-primary">{dictionary.upcomingEvent.reserve}</button>
            {toast.visible && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
        </div>
    )
}
