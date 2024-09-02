import { upcomingEvents } from "@/services/get-upcoming-events";
import UpcomingEventCard from "@/components/cards/UpcomingEventCard";
import { getDictionary } from "@/get-dictionary";
import { Suspense } from "react";

function LoadingSkeletonGrid() {
    const skeletons = Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    ));
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
            {skeletons}
        </div>
    );
}

async function DashboardPage({ params: { lang } }) {
    const dictionary = await getDictionary(lang);
    const events= await upcomingEvents();


    return (
        <div>
             <h1 className="text-2xl font-bold mb-4 text-center">{dictionary.events.title}</h1>
            <Suspense fallback={<LoadingSkeletonGrid />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
                    {events.data.data.upcomingEvents.map((event) => (
                        <UpcomingEventCard key={event.id} event={event} dictionary={dictionary} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
}

export default DashboardPage;
