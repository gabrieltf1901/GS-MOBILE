// navigation/MainTabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ShelterStackNavigator from "./ShelterStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../assets/styles/colors";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="AbrigosTab"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.secondary,
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopColor: colors.inputBorder,
        height: Platform.OS === "ios" ? 80 : 60,
        paddingBottom: Platform.OS === "ios" ? 20 : 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "AbrigosTab") {
          iconName = Platform.OS === "ios" ? "home-outline" : "home";
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === "ProfileTab") {
          iconName = Platform.OS === "ios" ? "person-outline" : "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        }
        return null;
      },
    })}
  >
    <Tab.Screen
      name="AbrigosTab"
      component={ShelterStackNavigator}
      options={{ tabBarLabel: "Abrigos" }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{ tabBarLabel: "Perfil" }}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
