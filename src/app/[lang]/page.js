import { getDictionary } from "@/get-dictionary";
import { deployServer } from "@/services/deploy-server";

export default async function InitPage({
    params: { lang },
}) {
    const dictionary = await getDictionary(lang);
    let response = null;
    if ((process.env.TRIGGER_DEPLOYMENT_URL).length > 0){
        response = await deployServer();
    }


    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-6xl">{dictionary.init.welcome}</h1>
            <p>{dictionary.init.deploy}</p>
        </div>
    );
}
