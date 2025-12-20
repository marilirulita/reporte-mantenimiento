export const colors = {
  primary: "#171717",
  secondary: "#414650ff",
  gray100: "#F9FAFB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  white: "#FFFFFF",
  black: "#000",
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
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray500,
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
    shadowColor: colors.gray400,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  large: {  
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 16,
  },
};
