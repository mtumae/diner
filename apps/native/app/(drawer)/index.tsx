import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Container } from "@/components/container";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@diner/backend/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";

export default function Home() {
	const healthCheck = useQuery(api.healthCheck.get);
	const { isAuthenticated } = useConvexAuth();
	const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

	return (
		<Container>
			<ScrollView className="flex-1">
				<View className="px-4">
					<Text className="font-mono text-foreground text-3xl font-bold mb-4">
						BETTER T STACK
					</Text>

					{user ? (
						<View className="mb-6 p-4 bg-card rounded-lg border border-border">
							<View className="flex-row justify-between items-center mb-2">
								<Text className="text-foreground text-base">
									Welcome, <Text className="font-medium">{user.name}</Text>
								</Text>
							</View>
							<Text className="text-muted-foreground text-sm mb-4">
								{user.email}
							</Text>
							<TouchableOpacity
								className="bg-destructive py-2 px-4 rounded-md self-start"
								onPress={() => {
									authClient.signOut();
								}}
							>
								<Text className="text-white font-medium">Sign Out</Text>
							</TouchableOpacity>
						</View>
					) : null}
					<View className="mb-6 rounded-lg border border-border p-4">
						<Text className="mb-3 font-medium text-foreground">API Status</Text>
						<View className="flex-row items-center gap-2">
							<View
								className={`h-3 w-3 rounded-full ${
									healthCheck ? "bg-green-500" : "bg-red-500"
								}`}
							/>
							<Text className="text-muted-foreground">
								{healthCheck === undefined
									? "Checking..."
									: healthCheck === "OK"
										? "Connected to API"
										: "API Disconnected"}
							</Text>
						</View>
					</View>
					{!user && (
						<>
							<SignIn />
							<SignUp />
						</>
					)}
				</View>
			</ScrollView>
		</Container>
	);
}
