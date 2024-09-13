import { formatTimestamp } from "@/utils/timestamp";

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
                    <p>{dictionary.reservation.status}: {dictionary.reservation.statusOptions[reservation.status]}</p>
                </div>

        </div>
    )
}
