'use client';
import { useState } from "react";
import Toast from "./Toast";

export default function ReserveButton({ event, dictionary}) {

    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };


    const reserve = async () => {
        console.log('Reserve button clicked');
        setToast({ message: `${event.id} ${event.name}`, type: "success", visible: true });
    }

    return (
        <div>
            <button onClick={() => reserve()} className="btn btn-primary">{dictionary.upcomingEvent.reserve}</button>
            {toast.visible && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
        </div>
    )
}
