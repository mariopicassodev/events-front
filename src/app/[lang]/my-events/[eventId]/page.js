import {getDictionary} from '@/get-dictionary';

export default async function EventPage({params: {lang, eventId}}) {
    const dictionary = await getDictionary(lang);
    const event = await getEvent(eventId);
    console.log(JSON.stringify(event));

    return (
        <div>
            <h1>Event Page</h1>
        </div>
    )
}
