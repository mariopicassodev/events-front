import { formatTimestamp } from "@/utils/timestamp";
import ReserveButton from "../buttons/ReserveButton";
export default async function ReservationCard({ dictionary, reservation }) {



    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{reservation.event.name}</h2>
                <p>{reservation.event.description}</p>
                <p>{dictionary.reservation.location}: {reservation.event.location}</p>
                <p>{formatTimestamp(reservation.event.schedule)}</p>
                <p>{reservation.event.fee}$</p>
                <p>{dictionary.reservation.maxCapacity}: {reservation.event.maxCapacity}</p>
                <div className={`badge ${reservation.status === 'PENDING' ? 'badge-neutral' : reservation.status === 'ACCEPTED' ? 'badge-primary' : 'badge-accent'}`}>
                    {dictionary.reservation.statusOptions[reservation.status]}
                </div>
                <div className="card-actions justify-end">
                    <ReserveButton event={reservation.event} dictionary={dictionary} />
                </div>
            </div>

        </div>
    )
}
