import { getMyEvents } from "@/services/get-my-events"
import { getDictionary } from "@/get-dictionary";
import MyEventCard  from "@/components/cards/MyEventCard";

export default async function myEvents({params: {lang}}) {
    const dictionary = await getDictionary(lang);
    const myEvents = await getMyEvents();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">{dictionary.myEvents.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                {myEvents.data.data.userEvents.map((event) => (
                    <MyEventCard key={event.id} event={event} dictionary={dictionary} lang={lang}/>
                ))}
            </div>
        </div>
    )
}
