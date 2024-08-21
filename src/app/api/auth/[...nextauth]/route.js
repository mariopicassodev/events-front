import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        signIn: async (account) => {
            console.log(account.account.token_type, account.account.id_token);
            cookies().set(account.account.token_type, account.account.id_token, { secure: true });
            return true;
        },
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
