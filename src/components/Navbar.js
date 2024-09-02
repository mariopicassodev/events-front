import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import { getServerSession } from "next-auth";
import LocaleSwitcher from "./buttons/LocaleSwitcher";
import LoginButton from "./buttons/LogInButton";
import LogOutButton from "./buttons/LogOutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function Navbar({
    params: { lang },
}) {
    const dictionary = await getDictionary(lang);
    const session = await getServerSession(authOptions);

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Events App</a>
            </div>
            <div className="flex-none">
                <LocaleSwitcher />
                {session ? (
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={session.user.image} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><LogOutButton dictionary={dictionary} lang={lang}/></li>
                        <li><Link href="/my-events">{dictionary.navbar.myevents}</Link></li>
                        <li><Link href="/create-event">{dictionary.navbar.createevent}</Link></li>
                        <li><Link href="/events">{dictionary.navbar.events}</Link></li>
                        <li><Link href="/reservations">{dictionary.navbar.reservations}</Link></li>
                    </ul>
                </div>
                ) : (
                    <LoginButton dictionary={dictionary} lang={lang}/>
                )
            }

            </div>
        </div>
    )
}


