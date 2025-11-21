import CustomInput from "@/components/ui/custom-input";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Ingresa todos los campos.");
      return;
    }

    setLoading(true);
    const error = await login({ email, password });

    if (error) {
      Alert.alert("Error", error);
      setLoading(false);
      return;
    }

    router.replace("/");
  };

  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={10} // sube un poco más el último input
      >
        {/* Ícono superior */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/logo-icon-mant-blanco.png")}
            style={styles.icon}
          />
        </View>

        <Text style={styles.title}>App de Mantenimiento</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        {/* CARD DEL FORMULARIO */}
        <View style={styles.card}>
          <Text style={styles.label}>Email *</Text>
          <CustomInput
            placeholder="Ingresa tu email"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña *</Text>
          <View style={styles.passwordContainer}>
            <View style={styles.passwordInputWrapper}>
              <CustomInput
                placeholder="Ingresa tu contraseña"
                value={password}
                secureTextEntry={!showPassword}
                setValue={setPassword}
              />
            </View>
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.version}>
          Versión 1.0 - Sistema de Gestión de Mantenimiento
        </Text>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#1B64F2",
    padding: 20,
    borderRadius: 100,
    marginBottom: 10,
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2563eb",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    marginTop: 12,
    color: "#374151", // text-gray-700
    marginBottom: 4, // mb-1
    fontSize: 14, // text-sm
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInputWrapper: {
    flex: 1,
  },
  inputPassword: {
    minHeight: 40,
  },
  eyeButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1B64F2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  version: {
    marginTop: 30,
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },
});
