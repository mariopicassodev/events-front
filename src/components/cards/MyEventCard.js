import ManageReservationButton from "../buttons/ManageReservationsButton"

export default async function MyEventCard({ dictionary, event, lang }) {

    const formattedSchedule = new Date(event.schedule).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{event.name}</h2>
                <p>{dictionary.myEvents.location}: {event.location}</p>
                <p>{formattedSchedule}</p>
                <p>{dictionary.myEvents.createdAt}: {event.createdAt}</p>
                <p>{event.fee}$</p>
                <p>{dictionary.myEvents.maxCapacity}: {event.maxCapacity}</p>
                <p>{dictionary.myEvents.reservations}: {event.reservations.length}</p>
                <p>{dictionary.myEvents.pendingReservations}: {event.reservations.filter(reservation => reservation.status === 'PENDING').length}</p>
                <p>{dictionary.myEvents.acceptedReservations}: {event.reservations.filter(reservation => reservation.status === 'ACCEPTED').length}</p>


                <div className="card-actions justify-end">
                    <ManageReservationButton event={event} dictionary={dictionary} lang={lang} />
                </div>
            </div>
        </div>
    )
}
