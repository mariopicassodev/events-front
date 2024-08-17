import { getDictionary } from "@/get-dictionary";

export default async function InitPage({
    params: { lang },
}) {
    const dictionary = await getDictionary(lang);

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-6xl">{dictionary.init.welcome}</h1>
        </div>
    );
}
