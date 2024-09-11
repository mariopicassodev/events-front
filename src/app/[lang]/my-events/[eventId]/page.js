import { getDictionary } from '@/get-dictionary';
import getEvent from '@/services/get-event';
import acceptReservationButton from '@/components/buttons/AcceptReservationButton';
import rejectReservationButton from '@/components/buttons/RejectReservationButton';

export default async function EventPage({ params }) {
    const { lang, eventId } = params;
    console.log("lang: ", lang, "eventid", eventId);
    const dictionary = await getDictionary(lang);
    const event = await getEvent(eventId);
    console.log(JSON.stringify(event));

    const acceptedReservations = event.data.data.event.reservations.filter(reservation => reservation.status === 'ACCEPTED').length;
    const formattedSchedule = new Date(event.data.data.event.schedule).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div>
            <h1>{dictionary.manageReservations.title}</h1>
            <h2>{event.data.data.event.name}</h2>

            <div className="flex justify-between mb-4">
                <p>{formattedSchedule}</p>
                <p>{`${acceptedReservations}/${event.data.data.event.maxCapacity}`}</p>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{dictionary.manageReservations.name}</th>
                            <th>{dictionary.manageReservations.email}</th>
                            <th>{dictionary.manageReservations.status}</th>
                            <th>{dictionary.manageReservations.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.data.data.event.reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.user.name}</td>
                                <td>{reservation.user.email}</td>
                                <td>
                                    <div className={`badge ${reservation.status === 'PENDING' ? 'badge-neutral' : reservation.status === 'ACCEPTED' ? 'badge-primary' : 'badge-accent'}`}>
                                        {reservation.status}
                                    </div>
                                </td>
                                <td>
                                    <acceptReservationButton reservation={reservation} dictionary={dictionary} />
                                    <rejectReservationButton reservation={reservation} dictionary={dictionary} />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
