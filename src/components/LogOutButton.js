'use client';
import { signOut } from 'next-auth/react';

export default function LogOutButton({ dictionary , lang }) {
    return (
        <a onClick={() => signOut({ callbackUrl: `/${lang}` })}>{dictionary.navbar.logout}</a>
    )
}
