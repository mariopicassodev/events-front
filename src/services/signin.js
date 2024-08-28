import { cookies } from 'next/headers';
import { fromJWEtoJWT } from '@/utils/jwt';

export async function signInServer(name, email) {

    const response = await fetch(`${process.env.SERVER_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            name: name,
        }),
    });

    return response;
}
