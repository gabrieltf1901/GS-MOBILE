// services/api.js

import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5108/api"    // Android emulador
    : "http://localhost:5108/api";   // iOS simulator ou web

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default api;
