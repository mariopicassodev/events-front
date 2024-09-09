import React from "react";
import CreateEventForm from "@/components/CreateEventForm";
import { getDictionary } from "@/get-dictionary";

async function CreateEventPage( {params: {lang}} ) {
    const dictionary = await getDictionary(lang);
    return (
        <div className="container mx-auto p-6">
            <CreateEventForm dictionary={dictionary} />
        </div>
    );
}

export default CreateEventPage;
