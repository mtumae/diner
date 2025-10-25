import { Container } from "@/components/container";
import { Pressable, ScrollView, Text, View } from "react-native";
import { authClient } from "@/lib/auth-client";
import { TabBarIcon } from "@/components/tabbar-icon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Camera from "@/components/camera";
import { SignUp } from "@/components/sign-up";

const orders = [
    { id: '1', status: 'Delivered', items: ['Burger', 'Fries'], total: 15.99 },
    { id: '2', status: 'In Transit', items: ['Pizza'], total: 12.49 },
    { id: '3', status: 'Preparing', items: ['Sushi', 'Miso Soup'], total: 22.75 },
]



export default function TabThree() {
    const user = authClient.useSession();

    //query for notifictions based on userID


    return (
        <Container>
            {!user.data ? 
            <SignUp /> 
            : <View>
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
                <Pressable className="border p-4 rounded-lg none">
                    <FontAwesome size={20} name="bell-o" color={"white"} />
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
                        <View key={order.id} className="bg-gray-800 p-4 mb-2 rounded-lg flex-row justify-between">
                            <View>
                                <Text className="text-gray-400">Items: {order.items.join(", ")}</Text>
                            <Text className="text-gray-400">Total: ${order.total.toFixed(2)}</Text>
                            </View>
                            {order.status === 'Delivered' ? (
                                <FontAwesome name="check-circle" size={24} color="green" />
                            ) : (
                                <FontAwesome name="circle-o-notch" size={24} color="green" />
                            )}
                        </View>
                    ))}
                </View>
            </View>
            </View>
        }
        </Container>
    );
}
