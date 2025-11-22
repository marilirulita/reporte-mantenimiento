import { createUserInSupabase, updateUserInSupabase } from "@/db/databaseActions";
import { User } from "@/models/interfaces";
import { Ionicons } from "@expo/vector-icons"; // Si usas Expo
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingModal from "./LoadingModal";
import CustomInput from "./ui/custom-input";
import Dropdown from "./ui/dropdown";

type UserFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    username: string;
    name: string;
    role: User["role"];
    password?: string;
  }) => void;
  initialData?: {
    id?: number;
    username?: string;
    name?: string;
    role?: User["role"];
  };
  editingUserId?: string | null; // ID del usuario en Supabase (UUID) cuando se está editando
};

export default function UserForm({
  visible,
  onClose,
  onSubmit,
  initialData,
  editingUserId,
}: UserFormProps) {
  const isEditing = editingUserId !== null && editingUserId !== undefined;

  const [username, setUsername] = useState(initialData?.username || "");
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "Seleccionar rol");
  const [password, setPassword] = useState("");

  const [editingPassword, setEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // Actualizar los estados cuando initialData cambia o cuando el modal se abre
  useEffect(() => {
    if (visible) {
      if (isEditing && initialData) {
        setUsername(initialData.username || "");
        setName(initialData.name || "");
        setRole(initialData.role || "");
      } else {
        // Resetear para modo creación
        setUsername("");
        setName("");
        setRole("Seleccionar rol");
      }
      setPassword("");
      setEditingPassword(false);
    }
  }, [visible, initialData, isEditing]);

  const handleCreate = async () => {
    if (!name.trim() || !username.trim() || !role.trim() || !password.trim()) {
      alert("Completa todos los campos");
      return false;
    }
    if ( password.length < 8) {
      alert("Pasword deve de ser de al menos 8 caracteres");
      return false;
    }
    if (role !== "Administrador" && role !== "Tecnico") {
      alert("Rol invalido");
      return false;
    }
    try {
      setLoading(true);
      await createUserInSupabase({
        name,
        username,
        role: role as User["role"],
        password: password,
      });
      setLoading(false);
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al crear usuario";
      alert(message);
      setLoading(false);
      return false;
    }
  };

  const handleEdit = async () => {
    if (!name.trim() || !username.trim() || !role.trim()) {
      alert("Completa todos los campos");
      return false;
    }
    if ( password.length < 8 && editingPassword === true) {
      alert("Pasword deve de ser de al menos 8 caracteres");
      return false;
    }
    if (role !== "Administrador" && role !== "Tecnico") {
      alert("Rol invalido");
      return false;
    }
    if (!editingUserId) {
      alert("Error: No se encontró el ID del usuario a editar");
      return false;
    }
    try {
      setLoading(true);
      await updateUserInSupabase({
        id: editingUserId,
        name,
        username,
        role: role as User["role"],
        ...(password && password.trim() !== "" && editingPassword && { password_hash: password }),
      });
      setLoading(false);
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al actualizar usuario";
      alert(message);
      setLoading(false);
      return false;
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            {isEditing
              ? "Modifica la información del usuario."
              : "Completa la información para crear un nuevo usuario."}
          </Text>

          {/* Inputs */}
          <View style={styles.form}>
            <Text style={styles.label}>Nombre Completo *</Text>
            <CustomInput
              placeholder="Juan Pérez"
              value={name}
              setValue={setName}
            />

            <Text style={styles.label}>Role *</Text>
            <Dropdown
              initialRole={role}
              onSelectRole={(newRole) => setRole(newRole)}
            />

            <Text style={styles.label}>Usuario * <Text style={{fontWeight: 300, fontStyle: "italic"}}>Deve ser unico</Text></Text>
            
            <CustomInput
              placeholder="usuario123"
              value={username}
              setValue={setUsername}
            />

            {!isEditing && (
              <>
                <Text style={styles.label}>Contraseña *</Text>
                <View style={styles.passwordContainer}>
                  <View style={styles.passwordInputWrapper}>
                    <CustomInput
                      placeholder="********"
                      secureTextEntry={!showPassword}
                      style={styles.inputPassword}
                      value={password}
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
              </>
            )}

            {isEditing && !editingPassword && (
              <TouchableOpacity onPress={() => setEditingPassword(true)}>
                <Text style={styles.changePasswordText}>
                  Cambiar contraseña
                </Text>
              </TouchableOpacity>
            )}

            {isEditing && editingPassword && (
              <>
                <Text style={styles.label}>Nueva Contraseña *</Text>
                <View style={styles.passwordContainer}>
                  <View style={styles.passwordInputWrapper}>
                    <CustomInput
                      placeholder="********"
                      secureTextEntry={!showPassword}
                      value={password}
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
              </>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setEditingPassword(false);
                onClose();
              }}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={async () => {
                let complete = null;
                if (isEditing) {
                  complete = await handleEdit();
                } else {
                  complete = await handleCreate();
                }
                if (complete) {
                  onSubmit({
                    username,
                    name,
                    role: role as User["role"],
                    password: "",
                  });
                  setEditingPassword(false);
                }
              }}
            >
              <Text style={styles.submitText}>
                {isEditing ? "Guardar" : "Crear"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LoadingModal visible={loading} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  closeBtn: {
    fontSize: 22,
    paddingHorizontal: 6,
    color: "#6B7280",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  form: { gap: 12 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: -4,
  },
  changePasswordText: {
    textDecorationLine: "underline",
    color: "#2563EB",
    fontWeight: 700,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  cancelText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },

  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#2563EB",
  },
  submitText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
