'use client';
import { useRouter } from 'next/navigation'

export default function ManageReservationButton({ event, dictionary, lang }) {

    const router = useRouter();
    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={() => router.push(`/${lang}/my-events/${event.id}`)}>{dictionary.myEvents.manageReservation}</button>
        </div>
    )
}



