import { User } from "@/models/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // usuario logueado
  const [loading, setLoading] = useState(true); // para evitar pantallazos

  // Se ejecuta al iniciar la app
  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("currentUser");
      if (stored) {
        setUser(JSON.parse(stored));  // usuario ya logueado
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Función login
  const login = async (userData: User) => {
    await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  // Función logout
  const logout = async () => {
    await AsyncStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
