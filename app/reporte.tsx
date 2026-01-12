import { GradientLayout } from "@/components/GradientLayout";
import TabButton from "@/components/ui/TabButton";
import { useReporte } from "@/context/ReporteContext";
import { reporteStyles as styles } from "@/styles/reporteStyles";
import { Camera, ClipboardList, PenLine, Wrench } from "lucide-react-native";
import { Text, View } from "react-native";
import Cliente from "../components/ClienteScreen/cliente";
import Signature from "../components/FirmaScreen/firma";
import Fotos from "../components/FotosScreen/fotos";
import TecnicoScreen from "../components/TecnicoScreen/tecnico";
import { TabName } from "../types/navigation";
import { useTheme } from "@/theme/ThemeContext";
import Loading from "@/components/Loading";

export default function NuevoReporteScreen() {
  const { colors } = useTheme();
  const { reporte, setReporte, loadingPdf } = useReporte();

  const changeTab = (name: TabName) =>
    setReporte((prev) => ({ ...prev, activeTab: name }));

  const tabs: { name: TabName; icon: any }[] = [
    { name: "cliente", icon: ClipboardList },
    { name: "tecnico", icon: Wrench },
    { name: "fotos", icon: Camera },
    { name: "firma", icon: PenLine },
  ];

  // 🧩 Diccionario de pantallas
  const screens: Record<TabName, React.ComponentType<any>> = {
    cliente: Cliente,
    tecnico: TecnicoScreen,
    fotos: Fotos,
    firma: () => (
      <View style={{ flex: 1 }}>
        <Signature />
      </View>
    ),
  };

  const ActiveScreen = screens[reporte.activeTab] ?? Cliente;

  return (
    <GradientLayout style={{ flex: 1, paddingHorizontal: 5 }}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, shadowColor: colors.icon },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Reporte de Mantenimiento
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Servicio de Refrigeración
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
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
      {loadingPdf && <Loading />}
    </GradientLayout>
  );
}
