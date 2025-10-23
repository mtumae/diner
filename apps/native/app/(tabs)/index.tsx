/** biome-ignore-all lint/nursery/useSortedClasses: <explanation> */
import { Container } from "@/components/container";
import { Pressable, ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { Image } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { TabBarIcon } from "@/components/tabbar-icon";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FontAwesome } from "@expo/vector-icons";

const items = [
	{ id: '1', quantity:1, name: 'Burger', description: 'Juicy grilled beef patty with fresh lettuce, tomato, and cheese.' },
	{ id: '2', quantity:1, name: 'Pizza', description: 'Cheesy pizza with pepperoni and mushrooms.' },
	{ id: '3', quantity:1, name: 'Sushi', description: 'Fresh sushi rolls with avocado and tuna.' },
	{ id: '4', quantity:1, name: 'Pasta', description: 'Creamy Alfredo pasta with chicken.' },
	{ id: '5', quantity:1, name: 'Salad', description: 'Mixed greens with cherry tomatoes and vinaigrette.' },
	{ id: '6', quantity:1, name: 'Tacos', description: 'Spicy beef tacos with lettuce and cheese.' },
	{ id: '7', quantity:1, name: 'Steak', description: 'Grilled steak with garlic butter and herbs.' },
	{ id: '8', quantity:1, name: 'Ice Cream', description: 'Creamy vanilla ice cream with chocolate sauce.' },
	{ id: '9', quantity:1, name: 'Sandwich', description: 'Turkey and cheese sandwich on whole grain bread.' },
]


interface ItemType {
	id: string;
	name: string;
	description: string;
	quantity: number;
}

export default function TabOne() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [cart, setCart] = useState<ItemType[]>([]);


	function clearCart(){
		setCart([]);
	}

	function removeFromCart(itemId: string) {
		setCart(cart.filter(item => item.id !== itemId));
  	}


	function handlePress(item:ItemType){
		if (cart.find(cartItem => cartItem.id === item.id)) {
			incrementQuantity(item.id);
		} else {
			setCart([...cart, item]);
		}
		expandSheet()
		console.log(`Pressed ${item.name}`)
	}

	function incrementQuantity(itemId: string) {
    	setCart(cart.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item));
  	}


	function expandSheet(){
		bottomSheetRef.current?.expand()
	}

	function closeSheet(){
		bottomSheetRef.current?.close()
	}
	const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


	return (
		<Container>
			<View className="flex-row items-center justify-between ml-4 mt-3 mb-3 bg-none text-white">
				<Pressable onPress={expandSheet} className="bg-blue-700 p-3 rounded-lg ">
					<TabBarIcon name="shopping-cart" color={"white"} />
				</Pressable>

				<TextInput
				className="border bg-white border-white w-96 p-3 text-gray-500 rounded-lg mr-4"
				placeholder="Search for an item"
				onChangeText={setSearchQuery}
				/>
			</View>
			<ScrollView className="flex-1 p-3 ">
				<View  className="flex mt-4 w-full">
					{items.map((i)=>(
						<View key={i.id} className="bg-blue-700 p-5  border rounded-lg mb-10 ">
						<Image
							source={{ uri: '' }}
							className="w-full h-32 object-cover rounded-md"
						/>

						<View className="flex items-center justify-between flex-row">
							<View>
								<Text className="text-xl text-white">{i.name}</Text>
								<Text className="text-xs text-white">{i.description}</Text>
							</View>

							<Pressable
								onPress={() => {
									handlePress(i);
								}}
								className="mt-2 bg-black text-white p-3 rounded-full">
								<TabBarIcon name="plus" color={"white"} />
							</Pressable>
						</View>
							
					</View>

					))}
					</View>

					<Pressable >
						<Text>Show More</Text>
					</Pressable>
			</ScrollView>
			<BottomSheet
					ref={bottomSheetRef}
					onChange={handleSheetChanges}
					snapPoints={["10%", "35%", "45%"]}
					enablePanDownToClose={true}
					backgroundStyle={styles.sheetBackground}
				>
					<BottomSheetView className="p-10  flex-1 bg-background">
					{cart.map((c)=>(
						<View key={c.id} className="mb-4">
							<Text className="text-lg font-bold text-white">{c.name} x{c.quantity} 
							
							</Text>
							<Text className="text-sm text-gray-600">{c.description}</Text>
							
						</View>
					))}

					{cart.length>0 ?
					<View className="flex-row justify-between mt-5">
					<Pressable className="flex-row gap-2 bg-red-800 items-center p-8 rounded-lg">
					
						<FontAwesome name="trash" size={20} color="white" />
					</Pressable>
					<Pressable className="flex-row gap-2 bg-green-800 items-center p-8 rounded-lg">
					
						<FontAwesome name="credit-card" size={20} color="white" />
					</Pressable>
					</View>
					:<Text className=" text-gray-500">Your cart is empty.</Text>
					}
					
					</BottomSheetView>
				</BottomSheet>
		</Container>
	);
}


const styles = StyleSheet.create({
	sheetBackground: {
		backgroundColor: '#020618', // Tailwind's gray-800
		borderRadius: 30,
	},
});