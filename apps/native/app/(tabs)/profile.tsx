import { Container } from "@/components/container";
import { Pressable, ScrollView, Text, View } from "react-native";
import { authClient } from "@/lib/auth-client";
import { TabBarIcon } from "@/components/tabbar-icon";
import FontAwesome from "@expo/vector-icons/FontAwesome";


const orders = [
    { id: '1', status: 'Delivered', items: ['Burger', 'Fries'], total: 15.99 },
    { id: '2', status: 'In Transit', items: ['Pizza'], total: 12.49 },
    { id: '3', status: 'Preparing', items: ['Sushi', 'Miso Soup'], total: 22.75 },
]



export default function TabThree() {
    const user = authClient.useSession();



    return (
        <Container>
            <View className="items-center justify-between flex-row gap-5 p-3 mt-20">

                
            
               

               <View className="flex-row items-center gap-5">
                  
                <FontAwesome size={54} name="user-circle" color={"white"} />
                <View className=" text-lef">
                    <Text className="text-primary"> 
                     mtume2016@gmail.com
                    </Text>
                    <Text className="text-white text-2xl">
                        Mtume Owino
                    </Text>
                </View>
                </View>


                <Pressable className="bg-red-500 p-4 rounded-lg none">
                    <FontAwesome size={20} name="sign-out" color={"white"} />
                </Pressable>




            </View>


            <View className="gap-1 mt-20">

                <Text className="text-gray-500 text-center">
                    Current balance
                </Text>
                <Text className=" text-5xl text-center  text-white">
                    10,000.00 
                </Text>

            </View>


            <View className="mt-20 px-4">
              

                <View className="">
                    {orders.map((order) => (
                        <View key={order.id} className="bg-gray-800 p-4 mb-2 rounded-lg">
                            <Text className="text-white">Order ID: {order.id}</Text>
                            <Text className="text-gray-400">Status: {order.status}</Text>
                            <Text className="text-gray-400">Items: {order.items.join(", ")}</Text>
                            <Text className="text-gray-400">Total: ${order.total.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

            </View>

            <Pressable className="bg-red-500 flex-1 flex-row mt-10 w-40 justify-self-center gap-2 items-center  p-4 rounded-full">
                <Text className="text-center text-white text-center">Sign out</Text>
                    <FontAwesome size={20} name="sign-out" color={"white"} />
            </Pressable>
        </Container>
    );
}
