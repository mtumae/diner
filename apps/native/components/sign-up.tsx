import { authClient } from "@/lib/auth-client";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);




	async function handleSignUpWGoogle(){
	
		await authClient.signIn.social({
			provider: "google",
		},{
			onError: (error) => {
				setError(error.error?.message || "Failed to sign up with Google");
				console.log("Google Sign up error:", error.error);
			}
		});
	}

	const handleSignUp = async () => {
		setIsLoading(true);
		setError(null);
		if (!password || !email || !name) {
			setError("All fields are required");
			setIsLoading(false);
			return;
		}
		if (password.length<8 ) {
			setError("Passwords must be at least 8 characters long!");
			return;
		} 
		await authClient.signUp.email(
			{
				name,
				email,
				password,
			},
			{
				onError: (error) => {
					setError(error.error?.message || "Failed to sign up");
					console.log("Sign up error:", error.error);
					setIsLoading(false);
				},
				onSuccess: () => {
					setName("");
					setEmail("");
					setPassword("");
				},
				onFinished: () => {
					setIsLoading(false);
				},
			},
		);
	
	};

	return (
		<View className="mt-6 text-center p-8 bg-card mt-auto mb-auto rounded-lg ">
			<Text className="text-xl font-semibold text-foreground  text-center" >
				Welcome! 
			</Text>
			<Text className="text-sm text-gray-500 mb-10 text-center" >
				Please create an account to get started.
			</Text>
			

			<TextInput
				className="mb-3 p-4 rounded-lg bg-input text-foreground border border-input"
				placeholder="Name"
				value={name}
				onChangeText={setName}
				placeholderTextColor="#9CA3AF"
			/>

			<TextInput
				className="mb-3 p-4 rounded-lg bg-input text-foreground border border-input"
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				placeholderTextColor="#9CA3AF"
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TextInput
				className={`mb-3 p-4 rounded-lg bg-input text-foreground border border-input ${error ? 'border-destructive' : ''}`}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				placeholderTextColor="#9CA3AF"
				secureTextEntry
			/>


			{error && (
				<View className="mb-4 p-3 bg-destructive/10 rounded-md">
					<Text className="text-destructive text-center text-sm">{error}</Text>
				</View>
			)}

			<TouchableOpacity
				onPress={handleSignUp}
				disabled={isLoading}
				className="bg-primary p-4 rounded-lg flex-row justify-center items-center"
			>
				{isLoading ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<View className="flex-row gap-2">
					<Text className="text-foreground font-medium">
						Sign Up
					</Text>
					<FontAwesome name="sign-in" size={16} color="white" className="" />
					</View>
				)}
			</TouchableOpacity>
			<Text className="text-foreground text-center mt-4 mb-4">Or</Text>

			<TouchableOpacity
				onPress={handleSignUpWGoogle}
				disabled={isLoading}
				className="mt-4 border border-gray-300 p-4 rounded-lg flex-row justify-center items-center"
			>
				{isLoading ? (
					<ActivityIndicator size="small" color="#000" />
				) : (
					<View className="flex-row gap-2">
					<Text className="text-foreground font-medium">
						Sign Up with Google
					</Text>
					<FontAwesome name="google" size={16} color="white" className="" />
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
}
