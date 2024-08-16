import Link from "next/link";
import { getDictionary } from "@/get-dictionary";


export default async function Navbar({
    params: { lang },
}) {
    const dictionary = await getDictionary(lang);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Events App</a>
            </div>
            <div className="flex-none">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link href="/logout">{dictionary.navbar.logout}</Link></li>
                        <li><Link href="/myevents">{dictionary.navbar.myevents}</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


