import React from "react";
import { TouchableOpacity, Linking, Image } from "react-native";
import MapScreen from "./screens/MapScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import InstructionScreen from "./screens/InstructionScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import PlacholderScreen from "./screens/PlacholderScreen";

const Tab = createBottomTabNavigator();

export default App = () => {
  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${995}";
    } else {
      phoneNumber = "telprompt:${995}";
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "green",
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Welcome!"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => {
              return <Ionicons name="home" color={color} size={24} />;
            },
            headerTitleStyle: {
              color: "red",
            },
            headerLeft: () => (
              <Image
                source={require("./assets/appLogo.jpg")}
                style={{ width: 60, height: 50, marginLeft: 5 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Find AED"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Find AED",
            tabBarIcon: ({ color }) => (
              <Ionicons name="map-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Call 995"
          component={PlacholderScreen}
          options={() => ({
            tabBarLabel: "Call 995",
            tabBarIcon: ({ color }) => (
              <TouchableOpacity onPress={dialCall}>
                <Ionicons name="call-outline" size={24} color={color} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name="Step by Step CPR"
          component={InstructionScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Step by Step CPR",
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                name="hand-holding-medical"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
