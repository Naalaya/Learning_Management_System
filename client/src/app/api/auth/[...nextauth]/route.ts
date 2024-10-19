// import { initial_User } from "@/lib/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Function to generate Refresh Token
const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET ?? "default_refresh_secret",
    {
      expiresIn: "24h", // Refresh Token is valid for 24 hours
    }
  );
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.username ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error("Please provide all required credentials");
        }

        try {
          // Request user data from the fake db (json-server)
          const response = await axios.get(
            `http://localhost:8888/users?user_id=${credentials.username}`
          );

          // Check if user is in db
          if (response.data.length === 0) {
            throw new Error("User not found");
          }

          const user = response.data[0];

          // Check if the role matches
          if (user.role.toLowerCase() !== credentials.role.toLowerCase()) {
            throw new Error("Invalid information, please try again.");
          }

          const account = user.account;
          if (!account) {
            throw new Error("Account information is missing.");
          }

          // Validate password
          const isPasswordValid =
            credentials.password === account.account_password;
          if (!isPasswordValid) {
            throw new Error("Invalid password.");
          }

          // If authentication is successful, return user object (excluding password)
          const { account_password, ...userWithoutPassword } = user;

          return userWithoutPassword;
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Server error occurred."
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 60, // 10 minutes for Access Token
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "default_jwt_secret",
    maxAge: 10 * 60, // 10 minutes for Access Token
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && user) {
        // When signing in, create both Access Token and Refresh Token
        token.name = user.user_name;
        token.email = user.personal_email;
        token.user_id = user.user_id;
        token.role = user.role;
        token.accessToken = jwt.sign(
          token,
          process.env.JWT_SECRET ?? "default_jwt_secret",
          {
            expiresIn: "10m",
          }
        );
        if (user.user_id) {
          token.refreshToken = generateRefreshToken(user.user_id);
        } else return null;
        token.accessTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
      }

      // Ensure accessTokenExpires has a valid number type
      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }
      // If Access Token has expired, use Refresh Token to create a new one
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      console.log(token);
      if (token) {
        session.user.user_id = token.user_id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // useSecureCookies: process.env.NODE_ENV === "production",
};

// Function to refresh Access Token
async function refreshAccessToken(token: any) {
  try {
    // Call API to refresh token (this should be implemented on your server)
    const response = await axios.post("API/RefreshToken", {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = response.data;
    console.log(refreshedTokens);
    return {
      ...token,
      accessToken: refreshedTokens.accessToken as string,
      accessTokenExpires: Date.now() + 10 * 60 * 1000, // 10 minutes expiration
      refreshToken:
        refreshedTokens.refreshToken ?? (token.refreshToken as string),
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// Extend the built-in types for NextAuth
declare module "next-auth" {
  interface User {
    user_name?: string;
    personal_email?: string;
    user_id?: string;
    role?: string;
    id?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
    refreshToken?: string;
    error?: string;
  }
}

// Export the configured NextAuth handler to handle GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
