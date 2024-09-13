'use server'

import { cookies } from 'next/headers';
import { fromJWEtoJWT } from '@/utils/jwt';

export async function getMyReservations() {

    const token = cookies().get(`${process.env.COOKIES_PREFIX}next-auth.session-token`).value;
    const user_id = cookies().get('user_id').value;


    const jwt_token = await fromJWEtoJWT(token);

    const query = `
        query {
            userReservations(userId: ${user_id}) {
                status
                event {
                    description
                    fee
                    id
                    location
                    schedule
                    maxCapacity
                    name
                    reservations {
                        id
                        status
                    }
                }
                id
                createdAt
            }
        }`

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

    // Ensure data is a plain object
    if (data && typeof data === 'object' && data.constructor === Object) {
        return { data, status, statusText };
    } else {
        throw new Error('Response is not a plain object');
    }

}
