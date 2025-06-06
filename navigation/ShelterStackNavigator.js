// navigation/ShelterStackNavigator.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ShelterDetailScreen from "../screens/ShelterDetailScreen";
import ResourceFormScreen from "../screens/ResourceFormScreen";
// 👉 Import da nova tela de cadastro de abrigo
import ShelterFormScreen from "../screens/ShelterFormScreen";

import colors from "../assets/styles/colors";

const Stack = createNativeStackNavigator();

const ShelterStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: colors.background },
      headerTintColor: colors.secondary,
      contentStyle: { backgroundColor: colors.background },
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Abrigos" }}
    />
    <Stack.Screen
      name="ShelterDetail"
      component={ShelterDetailScreen}
      options={{ title: "Detalhes do Abrigo" }}
    />
    <Stack.Screen
      name="ResourceForm"
      component={ResourceFormScreen}
      options={{ title: "Criar/Editar Recurso" }}
    />
    {/* Nova rota para cadastrar abrigo */}
    <Stack.Screen
      name="ShelterForm"
      component={ShelterFormScreen}
      options={{ title: "Cadastrar Abrigo" }}
    />
  </Stack.Navigator>
);

export default ShelterStackNavigator;
