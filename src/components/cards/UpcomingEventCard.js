import ReserveButton from "@/components/buttons/ReserveButton";

export default async function UpcomingEventCard({dictionary, event}) {

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
                <p>{event.description}</p>
                <p>{dictionary.upcomingEvent.location}: {event.location}</p>
                <p>{formattedSchedule}</p>
                <p>{event.fee}$</p>
                <p>{dictionary.upcomingEvent.maxCapacity}: {event.maxCapacity}</p>

                <div className="card-actions justify-end">
                    <ReserveButton event={event} dictionary={dictionary}/>
                </div>
            </div>
        </div>
    )
}
