import { Container } from "@/components/container";
import { Button, Pressable, ScrollView, Text, View } from "react-native";

export default function TabTwo() {
	return (
		<Container>
			<ScrollView className="flex-1 p-6">
				<View className="py-8">
					<Text className="text-3xl font-bold text-foreground mb-2">
						Promotions
					</Text>
					<Text className="text-lg text-muted-foreground">
						Discover more features and content
					</Text>

					<Pressable className="bg-primary">
						<Text>Title</Text>
					</Pressable>
				</View>
			</ScrollView>
		</Container>
	);
}
