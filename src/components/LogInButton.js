'use client';
import { signIn } from 'next-auth/react';
export default function LoginButton({dictionary, lang}) {
    return (
        <button onClick={() => signIn('google', { callbackUrl: `/${lang}/dashboard` })} className="btn btn-ghost">{dictionary.navbar.signin}</button>
    )
}
