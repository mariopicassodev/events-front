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
            console.log(account);
            console.log(account.account.token_type, account.account.id_token);
            cookies().set(account.account.token_type, account.account.id_token, { secure: true });

            // send to server email, token and name
            const response = await signInServer(account.user.name, account.user.email);

            if (response.status !== 200) {
                return false;
            }
            return true;
        },
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
