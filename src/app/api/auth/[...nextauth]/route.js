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

            cookies().set(account.account.token_type, account.account.id_token, { secure: true });
            // send to server email, token and name
            const response = await signInServer(account.user.name, account.user.email);

            if (response.status !== 200) {

                // TODO: handle better the error
                return false;
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
