import { getDictionary } from "@/get-dictionary";
import ReserveButton from "./ReserveButton";

export default async function UpcomingEvent({dictionary, event}) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{event.name}</h2>
                <p>{event.description}</p>
                <p>{dictionary.upcomingEvent.location}: {event.location}</p>
                <p>{event.schedule}</p>
                <p>{event.fee}$</p>
                <p>{dictionary.upcomingEvent.maxCapacity}: {event.maxCapacity}</p>

                <div className="card-actions justify-end">
                    <ReserveButton event={event} dictionary={dictionary}/>
                </div>
            </div>
        </div>
    )
}
