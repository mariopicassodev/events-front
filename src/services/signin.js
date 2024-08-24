import { cookies } from 'next/headers';

export async function signInServer(name, email) {

    const token = cookies().get('Bearer');

    const response = await fetch(`${process.env.SERVER_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
            email: email,
            name: name,
        }),
    });

    return response;
}
