'use server'

import { cookies } from 'next/headers';

export async function deleteAuthCookies() {
    cookies().delete('user_id');
}
