/** biome-ignore-all lint/nursery/useSortedClasses: <explanation> */
import { Container } from "@/components/container";
import { Pressable, ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput, ActivityIndicator, ImageBackground } from "react-native";
import { Image } from "react-native";
import { useColorScheme } from "@/lib/use-color-scheme";
import { useState, useEffect, useRef, useCallback } from "react";
import { TabBarIcon } from "@/components/tabbar-icon";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FontAwesome } from "@expo/vector-icons";
import  Animated, { useSharedValue } from "react-native-reanimated";
import { api } from "@diner/backend/convex/_generated/api";
import { useQuery } from "convex/react";


interface ItemType {
	name: string;
	description: string;
	quantity: number;
}

export default function TabOne() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [searching, setSearching]=useState(false)
	const [items, setItems]=useState<ItemType[]>([
		// { id: '1', quantity:1, name: 'Burger', description: 'Juicy grilled beef patty with fresh lettuce, tomato, and cheese.' },
		// { id: '2', quantity:1, name: 'Pizza', description: 'Cheesy pizza with pepperoni and mushrooms.' },
		// { id: '3', quantity:1, name: 'Sushi', description: 'Fresh sushi rolls with avocado and tuna.' },
		// { id: '4', quantity:1, name: 'Pasta', description: 'Creamy Alfredo pasta with chicken.' },
		// { id: '5', quantity:1, name: 'Salad', description: 'Mixed greens with cherry tomatoes and vinaigrette.' },
		// { id: '6', quantity:1, name: 'Tacos', description: 'Spicy beef tacos with lettuce and cheese.' },
		// { id: '7', quantity:1, name: 'Steak', description: 'Grilled steak with garlic butter and herbs.' },
		// { id: '8', quantity:1, name: 'Ice Cream', description: 'Creamy vanilla ice cream with chocolate sauce.' },
		// { id: '9', quantity:1, name: 'Sandwich', description: 'Turkey and cheese sandwich on whole grain bread.' },
	]);
	const [queriedItems, setQueriedItems]=useState<ItemType[]>(items);
	const [cart, setCart] = useState<ItemType[]>([]);
	const { isDarkColorScheme } = useColorScheme();
	const fakeItems = useQuery(api.items.getRandomItems)




	function getRandom(){
		console.log("Fake items from query:", fakeItems);
	}




	

	const styles = StyleSheet.create({
		sheetBackground: {
			backgroundColor: isDarkColorScheme ? '#030712' : 'white', // Tailwind's gray-800
			borderRadius: 30,
		},

		cardImage:{
			height: 200,
			borderRadius: 10,
			overflow: 'hidden',
			justifyContent:'space-around',
		}

		,cardDetails:{
			backdropFilter:'blur(30px)',
			flexDirection:"row",
			justifyContent:'space-between',
			alignItems:'baseline',
		
		}
});
	
	

	function clearCart(){
		setCart([]);
	}

		

	function removeFromCart(itemName: string) {
		setCart(cart.filter(item => item.name !== itemName));
  	}

	function search(query: string) {
		setSearching(true)
		if (query.length>2&& fakeItems) {
			console.log("Searching for:", query);
			if(fakeItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).length>0){
				setTimeout(() => {
					setQueriedItems(fakeItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase())))
				}, 1500);
			}else{
				setQueriedItems([])
				console.log("No items found")
			}
		}
		setSearching(false)
	}


	function handlePress(item:ItemType){
		if (cart.find(cartItem => cartItem.name === item.name)) {
			incrementQuantity(item.name);
		} else {
			setCart([...cart, item]);
		}
		expandSheet()
		console.log(`Pressed ${item.name}`)
	}

	function incrementQuantity(itemName: string) {
    	setCart(cart.map(item => item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item));
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
			<View className="flex-row items-center justify-between ml-4 mt-3 mb-3 bg-none text-white p-5">
				<Pressable onPress={expandSheet} className="bg-blue-700 p-3 rounded-lg ">
					<TabBarIcon name="shopping-cart" color={"white"} />
				</Pressable>

				<TextInput
				className="text-lg border-white  p-3 text-gray-300 rounded-lg mr-4"
				placeholder="Search for an item..."
				onChangeText={search}
				/>
			</View>
			<ScrollView className="flex-1 p-4 ">
			
				
				<View  className="flex mt-2 gap-10 w-full">
					{fakeItems?.map((i)=>(
				
						<ImageBackground
						key={i.imageUrl} 
							source={{ uri: i.imageUrl }}
							style={styles.cardImage}
						>

						<View 

						className=" flex-row items-center justify-self-end backdrop-blur-[10px] bg-gray-800/50 p-5"
						>
							<View>
								<Text className="text-xl text-white">{i.name}</Text>
								<Text className="text-xs text-white w-80">{i.description}</Text>
							</View>

							<Pressable
								onPress={() => {
									handlePress(i);
								}}
								className="mt-2 bg-blue-700 text-foreground p-3 rounded-full">
								<TabBarIcon name="plus" color={"#fff"} />
							</Pressable>
						</View>
						</ImageBackground>
							
				

					))}
					</View>

					<Pressable onPress={getRandom} >
						<Text className="text-white">get Random items</Text>
					</Pressable>
			</ScrollView>
			<BottomSheet
					ref={bottomSheetRef}
					onChange={handleSheetChanges}
					snapPoints={["15%", "35%"]}
					enablePanDownToClose={true}
					backgroundStyle={styles.sheetBackground}
				>
					<BottomSheetView className={`p-10 flex-1 ${isDarkColorScheme ? '' : 'bg-white'}`}>
					{cart.map((c)=>(
						<View key={c.description} className="mb-4">
							<Text className="text-lg font-bold text-foreground">
								{c.name} x{c.quantity} 
							</Text>
							<Text className="text-sm text-gray-600">{c.description}</Text>
						</View>
					))}

					{cart.length>0 ?
					<View className="flex-row justify-between mt-5">
					<Pressable onPress={clearCart} className="flex-row gap-2 bg-red-800 items-center p-8 rounded-lg">
						<FontAwesome name="trash" size={20} color="white" />
					</Pressable>
					<Pressable onPress={()=>{console.log(`Checking out... ${cart.length} items`)}} className="flex-row gap-2 bg-green-800 items-center p-8 rounded-lg">
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


