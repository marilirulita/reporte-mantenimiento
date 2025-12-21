export const colors = {
  accent: "#6DB4C5",
  secondary: "#1E1F24",
  primary: "#1F7A8C",
  
  gray100: "#EFF0F3",
  gray300: "#CDCED7",
  gray400: "#8B8D98",
  gray500: "#62636C",

  white: "#FFFFFF",
  black: "#000000",
};

export const colorsDark = {
  // Base
  background: "#0F172A", // Fondo principal (muy oscuro, no negro puro)
  surface: "#1E293B", // Cards, modales, inputs
  surfaceSoft: "#273449", // Hover / secciones internas

  // Accent (Radix-style)
  accent: "#1F7A8C",
  accentHover: "#2796AB",
  accentMuted: "#163E46",

  // Texto
  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",

  // Bordes / divisores
  border: "#334155",

  // Estados
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",

  white: "#FFFFFF",
  black: "#000000",
};

export const lightColors = {
  // Base
  background: "#F8FAFC",        // Fondo general (no blanco puro)
  surface: "#FFFFFF",           // Cards, inputs, modales
  surfaceSoft: "#F1F5F9",       // Secciones secundarias / hover

  // Accent
  accent: "#1F7A8C",
  accentHover: "#186775",
  accentMuted: "#D6EDF1",

  // Texto
  textPrimary: "#0F172A",
  textSecondary: "#334155",
  textMuted: "#64748B",

  // Bordes / divisores
  border: "#E2E8F0",

  // Estados
  success: "#16A34A",
  warning: "#D97706",
  error: "#DC2626",

  white: "#FFFFFF",
  black: "#000000",
};


export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
};

export const text = {
  title: {
    color: colorsDark.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: colorsDark.textSecondary,
  },
  body: {
    fontSize: 14,
  },
  textButton: {
    fontSize: 14,
    fontWeight: "500",
  },
};

export const buttonSizes = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,    
    fontSize: 14,
    borderRadius: radius.md,
    shadowColor: colorsDark.white,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  large: {  
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 16,
  },
};
