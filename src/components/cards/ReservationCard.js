
export default async function ReservationCard({ dictionary, reservation }) {
    return (
        <div className>
                <div className="card-body">
                    <h2 className="card-title">{reservation.event.name}</h2>
                    <p>{reservation.event.description}</p>
                    <p>{dictionary.reservation.location}: {reservation.event.location}</p>
                    <p>{reservation.event.schedule}</p>
                    <p>{reservation.event.fee}$</p>
                    <p>{dictionary.reservation.maxCapacity}: {reservation.event.maxCapacity}</p>
                    <p>{dictionary.reservation.status}: {dictionary.reservation.statusOptions[reservation.status]}</p>
                </div>

        </div>
    )
}
