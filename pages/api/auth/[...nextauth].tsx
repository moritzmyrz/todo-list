import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
	// https://next-auth.js.org/configuration/providers
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.SECRET,
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: 'jwt',
	},

	// You can define custom pages to override the built-in ones. These will be regular Next.js pages
	// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	pages: {
		// signIn: '/auth/signin',  // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},

	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		// async signIn(user, account, profile) { return true },
		// async redirect(url, baseUrl) { return baseUrl },
		// async session(session, user) { return session },
		// async jwt(token, user, account, profile, isNewUser) { return token }
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// Enable debug messages in the console if you are having problems
	debug: false,
});
