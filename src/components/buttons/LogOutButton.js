'use client';
import { signOut } from 'next-auth/react';
import { deleteAuthCookies } from '@/services/delete-cookies';

export default function LogOutButton({ dictionary , lang }) {
    return (
        <a onClick={() => {
            deleteAuthCookies();
            signOut({ callbackUrl: `/${lang}` });
        }}>{dictionary.navbar.logout}</a>
    )
}
