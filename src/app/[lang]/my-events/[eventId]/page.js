import { getDictionary } from '@/get-dictionary';
import getEvent from '@/services/get-event';

export default async function EventPage({ params }) {
    const { lang, eventId } = params;
    console.log("lang: ", lang, "eventid", eventId);
    const dictionary = await getDictionary(lang);
    const event = await getEvent(eventId);
    console.log(JSON.stringify(event));


    return (
        <div>
            <h1>Event Page</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.data.data.event.reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.user.name}</td>
                                <td>{reservation.user.email}</td>
                                <td>{reservation.status}</td>
                                <td>
                                    <button className="btn btn-xs btn-primary mr-2">Accept</button>
                                    <button className="btn btn-xs btn-accent">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
