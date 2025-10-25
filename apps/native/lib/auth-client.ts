import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { expoClient } from "@better-auth/expo/client";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: process.env.EXPO_PUBLIC_CONVEX_SITE_URL,
	plugins: [
		anonymousClient(),
		expoClient({
			scheme: Constants.expoConfig?.scheme as string,
			storagePrefix: Constants.expoConfig?.scheme as string,
			storage: SecureStore,
		}),
		convexClient(),
	],
	socialProviders: {
		prompt: "select_account", 
		google: {
			clientId:"YOUR_GOOGLE_OAUTH_CLIENT_ID",
			clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
		},
	},
});
