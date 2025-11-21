import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from '@supabase/supabase-js';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from '../lib/supabase';
import { Profile } from "@/models/interfaces";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isTechnician: boolean;
  login: (userData: { email: string; password: string; }) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // usuario logueado
  const [profile, setProfile] = useState<Profile | null>(null); // perfil del usuario
  const [loading, setLoading] = useState(true); // para evitar pantallazos
  const [isTechnician, setIsTechnician] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Función para obtener el perfil del usuario desde Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error al obtener perfil:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }
  };

  // Se ejecuta al iniciar la app
  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const userProfile = await fetchUserProfile(session.user.id);
        setProfile(userProfile);
        setIsAdmin(userProfile?.role === "Administrador");
        setIsTechnician(userProfile?.role === "Tecnico");
      } else {
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        setIsTechnician(false);
      }
      setLoading(false);
    });

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const userProfile = await fetchUserProfile(session.user.id);
        setProfile(userProfile);
        setIsAdmin(userProfile?.role === "Administrador");
        setIsTechnician(userProfile?.role === "Tecnico");
      } else {
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        setIsTechnician(false);
      }
      setLoading(false);
    });

    // Limpiar suscripción al desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, [])

  // Función login
  async function login(userData: { email: string; password: string; }): Promise<string | null> {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        setLoading(false);
        return error.message;
      }

      // Obtener el perfil del usuario después del login
      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id);
        setProfile(userProfile);
        setIsAdmin(userProfile?.role === "Administrador");
        setIsTechnician(userProfile?.role === "Tecnico");
      }

      setLoading(false);
      return null;
    } catch (error) {
      setLoading(false);
      return error instanceof Error ? error.message : 'Error desconocido al iniciar sesión';
    }
  }

  // Función logout
  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      await AsyncStorage.removeItem("currentUser");
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      setIsTechnician(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading, isAdmin, isTechnician }}>
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
