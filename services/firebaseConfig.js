// services/firebaseConfig.js

import { initializeApp } from "firebase/app";

// Imports para React Native Authentication
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtBQChdS6Ce8HDA3LMmrkgjWnxR-XxMfQ",
  authDomain: "gestaoabrigosmobile.firebaseapp.com",
  projectId: "gestaoabrigosmobile",
  storageBucket: "gestaoabrigosmobile.firebasestorage.app",
  messagingSenderId: "452751158866",
  appId: "1:452751158866:web:0cf45de70c35019704798b",
  measurementId: "G-MM5TKQDN26",
};

// 1. Inicializa o app Firebase (sem Analytics)
const app = initializeApp(firebaseConfig);

// 2. Inicializa o Auth para React Native, usando AsyncStorage como persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 3. Exporte apenas o auth
export { auth };
