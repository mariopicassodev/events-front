'use server'

import { cookies } from 'next/headers';
import { fromJWEtoJWT } from '@/utils/jwt';


export default async function getEvent(eventId) {

    const token = cookies().get('next-auth.session-token').value;
    const user_id = cookies().get('user_id').value;

    const jwt_token = await fromJWEtoJWT(token);

    const query = `
        query {
            event(id: ${eventId}) {
                id
                maxCapacity
                name
                createdAt
                reservations {
                    id
                    status
                    user {
                        id
                        name
                        email
                    }
                }
            }
        }`

    console.log(query);

    const response = await fetch(`${process.env.SERVER_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt_token}`
        },
        body: JSON.stringify({ query })
    });

    const status = response.status;
    const statusText = response.statusText;
    const data = await response.json();
    console.log(data);

    // Ensure data is a plain object
    if (data && typeof data === 'object' && data.constructor === Object) {
        return { data, status, statusText };
    } else {
        throw new Error('Response is not a plain object');
    }

}
