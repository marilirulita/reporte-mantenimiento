# 📱 App de Mantenimiento – Generador de Reportes PDF

Aplicación móvil para generar y administrar reportes de mantenimiento mediante un formulario completo con datos de cliente, equipo, detalles técnicos, fotografías y firma de verificación.
Incluye historial para consultar reportes previos y volver a generar los PDF.

## 📝 Descripción

Esta aplicación permite crear reportes de mantenimiento desde cualquier dispositivo móvil.
Los usuarios pueden:

- Registrar información del cliente y del equipo.

- Agregar detalles técnicos.

- Capturar fotografías del trabajo realizado.

- Firmar digitalmente para validar el servicio.

- Generar un **reporte PDF** listo para enviar o guardar.

- Acceder a un historial donde todos los reportes quedan almacenados localmente.

- Regenerar PDFs anteriores desde el historial.

- Es ideal para técnicos, empresas de mantenimiento y servicios en campo.

## 🛠️ Tecnologías utilizadas

- **Expo** (React Native)

- **expo-sqlite** (base de datos local)

- **expo-file-system**

- **expo-media-library**

- **expo-sharing**

- **react-native-svg** (firma digital)

- **React Navigation**

- **TypeScript**

## 📦 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js**

- **npm o yarn**

- **Git** (opcional pero recomendado)

## ▶️ Cómo ejecutar el proyecto localmente

1. **Clonar el repositorio**

   ```bash
   git clone git@github.com:marilirulita/reporte-mantenimiento.git
   ```

2. **Entrar al directorio**

   ```bash
   cd reporte-mantenimiento
   ```

3. **Instalar dependencias**

   ```bash
   npm install
   ```

4. **Iniciar el proyecto**

   ```bash
   npx expo start
   ```

5. **Abre la app en tu dispositivo con Expo Go o usa un emulador.**

## 📜 Scripts importantes

| Script | Acción |
| ------------- | ------ |
|`npm start` / `expo start` | Inicia el proyecto en modo desarrollo |
| `npm run android` | Abre en un emulador Android |
| `npm run ios` | Abre en un simulador iOS (solo Mac) |
| `eas build -p android` | Genera APK/AAB |
| `eas update` | Publica actualizaciones OTA |

## 📁 Estructura de carpetas

```markdown
/app
  -_layout.tsx
  - +not-found.tsx
  - historial.tsx
  - index.tsx
  - PanelFirma.tsx
  - reporte.tsx
/assets
  /images
    - icon.png
    - logo.png
/components
  /ui
    - button.tsx
    - custom-input.tsx
  - BotonFinalizar.tsx
  - cliente.tsx
  - equipo.tsx
  - firma.tsx
  - fotos.tsx
/context
  - ReporteContext.tsx
/db
  - database.js
  - databaseActions.ts
/hooks
  - useNextSection.tsx
/models
  - Reporte.ts
/types
  - navigation.ts
/utils
  - generarPDF.tsx
  - getBase64Image.ts
  - templaitePDF-download.ts
  - templaitPDF.ts
  - template.html
app.json
eas.json
eslint.config.js
package.json
README.md
tsconfig.json
```

## 📲 Cómo descargar APK (Android)

[Link de descarga](https://onlinemarkdown.com)

## 👤 Créditos / Autor

Desarrollado por **Marysol Bautista**
🚀 ***WebXpymE*** — Soluciones digitales para microempresarios.
