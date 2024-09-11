
export default async function ReservationCard({ dictionary, reservation }) {

    const formattedSchedule = new Date(reservation.event.schedule).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{reservation.event.name}</h2>
                    <p>{reservation.event.description}</p>
                    <p>{dictionary.reservation.location}: {reservation.event.location}</p>
                    <p>{formattedSchedule}</p>
                    <p>{reservation.event.fee}$</p>
                    <p>{dictionary.reservation.maxCapacity}: {reservation.event.maxCapacity}</p>
                    <p>{dictionary.reservation.status}: {dictionary.reservation.statusOptions[reservation.status]}</p>
                </div>

        </div>
    )
}
