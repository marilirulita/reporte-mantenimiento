import { View, Text } from "react-native";
import { ClipboardList, Wrench, Camera, PenLine } from "lucide-react-native";
import Cliente from "../components/cliente";
import Equipo from "../components/equipo";
import Fotos from "../components/fotos";
import Signature from "../components/firma";
import { useReporte } from "@/context/ReporteContext";
import { GradientLayout } from "@/components/GradientLayout";
import { reporteStyles as styles } from "@/styles/reporteStyles";
import TabButton from "@/components/ui/TabButton";

export default function NuevoReporteScreen() {
  const { reporte, setReporte } = useReporte();

  const changeTab = (name: TabName) =>
    setReporte((prev) => ({ ...prev, activeTab: name }));

  type TabName = "cliente" | "tecnico" | "fotos" | "firma";

  const tabs: { name: TabName; icon: any }[] = [
    { name: "cliente", icon: ClipboardList },
    { name: "tecnico", icon: Wrench },
    { name: "fotos", icon: Camera },
    { name: "firma", icon: PenLine },
  ];

  // 🧩 Diccionario de pantallas
  const screens: Record<TabName, React.ComponentType<any>> = {
    cliente: Cliente,
    tecnico: Equipo,
    fotos: Fotos,
    firma: () => (
      <View style={{ flex: 1 }}>
        <Signature />
      </View>
    ),
  };

  const ActiveScreen = screens[reporte.activeTab] ?? Cliente;

  return (
    <GradientLayout style={{ flex: 1, padding: 10 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reporte de Mantenimiento</Text>
        <Text style={styles.headerSubtitle}>Servicio de Refrigeración</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            tab={tab}
            active={reporte.activeTab === tab.name}
            onPress={() => changeTab(tab.name)}
          />
        ))}
      </View>

       {/* Contenido */}
      <ActiveScreen />
    </GradientLayout>
  );
}
