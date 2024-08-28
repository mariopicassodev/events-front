import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { signInServer } from "@/services/signin";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        signIn: async (account) => {
            const response = await signInServer(account.user.name, account.user.email);

            if (response.status !== 200) {
                throw new Error(`${response.status}: ${response.body}`);
            }
            // store user_id in cookie
            const data = await response.json();

            cookies().set('user_id', data.user_id, { secure: true });

            return true;
        },
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
