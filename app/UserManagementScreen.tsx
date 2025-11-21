import UserForm from "@/components/userForm";
import { desactivarUserInSupabase, getUsersFromSupabase } from "@/db/databaseActions";
import shortenText from "@/utils/shortenText";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Profile } from "../models/interfaces";

const UserManagementScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState<Profile[]>([]);
  const [user, setUser] = useState<Profile>({
    id: "",
    email: "",
    name: "",
    role: "Tecnico",
    username: "",
    is_active: true,
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await getUsersFromSupabase();
      setUsers(result);
    } catch (error) {
      console.log("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);
  
  /* User List */
  const renderUser = ({ item }: { item: (typeof users)[0] }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        {/* Icon */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                item.role === "Administrador" ? "#F3E8FF" : "#DBEAFE",
            },
          ]}
        >
          <MaterialCommunityIcons
            name={item.role === "Administrador" ? "shield-check" : "wrench"}
            size={28}
            color={item.role === "Administrador" ? "#8B5CF6" : "#2563EB"}
          />
        </View>

        <View style={styles.textInfo}>
          <Text style={styles.name}>{shortenText(item.name, 12)}</Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  item.role === "Administrador" ? "black" : "#E5E7EB",
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: item.role === "Administrador" ? "white" : "#111827",
                },
              ]}
            >
              {shortenText(item.role, 15)}
            </Text>
          </View>
          <Text style={styles.smallText}>@{shortenText(item.username, 12)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
        style={styles.editButton}
        onPress={() => {
          setUser(item);
          setEditingUserId(item.id);
          setModalVisible(true)}}
        >
          <Feather name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>

        {item.is_active === true ? (
        <TouchableOpacity style={[styles.deleteButton, {backgroundColor: "#0BDA30",}]}
        onPress={async () => {
          await desactivarUserInSupabase(item.id, false);
          loadUsers();
        }}
        >
            <Feather name="circle" size={30} color="#0AAA40" />
        </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.deleteButton, {backgroundColor: "#D3D3D3",}]}
        onPress={async () => {
          await desactivarUserInSupabase(item.id, true);
          loadUsers();
        }}
        >                    
          <Feather name="circle" size={30} color="#878787" />
        </TouchableOpacity>
        )}  
      </View>
    </View>
  );
  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="people-outline" size={40} color="white" />
        </View>
        <View>
          <Text style={styles.title}>Gestión de Usuarios</Text>
          <Text style={styles.subtitle}>
            {users.length} {users.length === 1 ? "usuario" : "usuarios"}{" "}
            registrados
          </Text>
        </View>
      </View>
      {/* Boton nuevo usuario */}
      <View style={styles.botonContainer}>
        <TouchableOpacity 
        style={styles.newUserButton}
        onPress={() => setModalVisible(true)}
        >
          <Feather name="user-plus" size={18} color="#fff" />
          <Text style={styles.newUserText}>Nuevo Usuario</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
      )}

      {/* Modal para crear y editar user */}
      <UserForm
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setUser({
            id: "",
            email: "",
            name: "",
            role: "Tecnico",
            username: "",
            is_active: true,
          });
          setEditingUserId(null);
          loadUsers();
        }}
        onSubmit={(data) => {
          console.log("Usuario creado:", data);
          setModalVisible(false);
          setUser({
            id: "",
            email: "",
            name: "",
            role: "Tecnico",
            username: "",
            is_active: true,
          });
          setEditingUserId(null);
          loadUsers();
        }}
        initialData={editingUserId ? {
          id: 1, // UserForm espera number, pero usaremos editingUserId (string) en las funciones
          username: user.username,
          name: user.name,
          role: user.role,
        } : undefined}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  headerIcon: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 10,
  },
  botonContainer: {
    marginBottom: 20,
    flexDirection: "row",
  },
  newUserButton: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  newUserText: {
    marginLeft: 6,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  // User Cards
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  textInfo: {
    flexDirection: "column",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  name: {
    fontWeight: "600",
    marginRight: 8,
    fontSize: 16,
    textTransform: "capitalize",
    color: "#1e293b",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  smallText: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Buttons
  actions: {
    alignItems: "center",
    gap: 12,
  },
  editButton: {
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
  },
  deleteButton: {
    padding: 3,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
  },
});

export default UserManagementScreen;
