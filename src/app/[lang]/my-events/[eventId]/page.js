import { getDictionary } from '@/get-dictionary';
import getEvent from '@/services/get-event';
import ReservationsTable from '@/components/ReservationsTabel';


export default async function EventPage({ params }) {
    const { lang, eventId } = params;
    const dictionary = await getDictionary(lang);
    const event = await getEvent(eventId);


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center" >{dictionary.manageReservations.title}</h1>
            <ReservationsTable event={event.data.data.event} dictionary={dictionary} />
        </div>
    )
}
