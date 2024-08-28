import { useEffect, useState } from 'react';
import { getDictionary } from "@/get-dictionary";

function useDictionary(lang) {
    const [dictionary, setDictionary] = useState(null);

    useEffect(() => {
        async function fetchDictionary() {
            const response = await getDictionary(lang);
            setDictionary(response);
        }

        if (lang) {
            fetchDictionary();
        }
    }, [lang]);

    return dictionary;
}
