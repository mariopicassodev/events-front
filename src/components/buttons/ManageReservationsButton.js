'use client';
import { useRouter } from 'next/navigation'

export default function ManageReservationButton({ event, dictionary }) {

    const router = useRouter();
    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={router.push(`/my-events/${event.id}`)}>{dictionary.myEvents.manageReservations}</button>
        </div>
    )
}



