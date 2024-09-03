"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../../i18n-config";
import { getLocale, redirectedPathName } from "@/utils/path-name";

export default function LocaleSwitcher() {
    const pathName = usePathname();


    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                {getLocale(pathName)}
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {i18n.locales.map((locale) => {
                    if (locale === getLocale(pathName)) return null;
                    return (
                        <li key={locale}>
                            <Link href={redirectedPathName(locale, pathName)}>{locale}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>

    );
}


