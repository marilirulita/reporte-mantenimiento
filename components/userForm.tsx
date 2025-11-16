import { createUser, updateUser } from "@/db/databaseActions";
import { User } from "@/models/interfaces";
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
};

export default function UserForm({
  visible,
  onClose,
  onSubmit,
  initialData,
}: UserFormProps) {
  const isEditing = initialData !== undefined && initialData.id !== 0;

  const [id, setId] = useState(initialData?.id || 0);
  const [username, setUsername] = useState(initialData?.username || "");
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "Seleccionar rol");
  const [password, setPassword] = useState("");

  const [editingPassword, setEditingPassword] = useState(false);

  // Actualizar los estados cuando initialData cambia o cuando el modal se abre
  useEffect(() => {
    if (visible) {
      if (isEditing && initialData) {
        setId(initialData.id || 0);
        setUsername(initialData.username || "");
        setName(initialData.name || "");
        setRole(initialData.role || "");
      } else {
        // Resetear para modo creación
        setId(0);
        setUsername("");
        setName("");
        setRole("Seleccionar rol");
      }
      setPassword("");
    }
  }, [visible, initialData, isEditing]);

  const handleCreate = async () => {
    
    if (!name.trim() || !username.trim() || !role.trim() || !password.trim()) {
      alert("Completa todos los campos");
      return;
    }
    if (role !== "Administrador" && role !== "Tecnico") {
      alert("Rol invalido");
      return;
    }
    await createUser({
      name,
      username,
      role: role as User["role"],
      password,
    });
  };

  const handleEdit = async () => {
    if (role !== "Administrador" && role !== "Tecnico") {
      alert("Rol invalido");
      return;
    }
    if (!name.trim() || !username.trim() || !role.trim()) {
      alert("Completa todos los campos");
      return;
    }
    const userData = {
      id,
      name,
      username,
      role: role as User["role"],
      ...(password && password.trim() !== "" && { password }),
    };
    await updateUser(userData);
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
            <Text style={styles.label}>Usuario *</Text>
            <CustomInput
              placeholder="usuario123"
              value={username}
              setValue={setUsername}
            />

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

            {!isEditing && (
              <>
                <Text style={styles.label}>Contraseña *</Text>
                <CustomInput
                  placeholder="********"
                  secureTextEntry
                  value={password}
                  setValue={setPassword}
                />
              </>
            )}

            {isEditing && !editingPassword && (
              <TouchableOpacity
                style={styles.changePasswordButton}
                onPress={() => setEditingPassword(true)}
              >
                <Text style={styles.changePasswordText}>
                  Cambiar contraseña
                </Text>
              </TouchableOpacity>
            )}

            {isEditing && editingPassword && (
              <>
                <Text style={styles.label}>Nueva Contraseña *</Text>
                <CustomInput
                  placeholder="********"
                  secureTextEntry
                  value={password}
                  setValue={setPassword}
                />
              </>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} 
            onPress={() => {
              setEditingPassword(false);
              onClose();
            }}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={async () => {
                if (isEditing) {
                  await handleEdit();
                } else {
                  await handleCreate();
                }
                onSubmit({
                  username,
                  name,
                  role: role as User["role"],
                  password: password || undefined,
                });
                setEditingPassword(false);
              }}
            >
              <Text style={styles.submitText}>
                {isEditing ? "Guardar" : "Crear"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  changePasswordButton: {},
  changePasswordText: {
    textDecorationLine: "underline",
    color: "#2563EB",
    fontWeight: 700,
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
