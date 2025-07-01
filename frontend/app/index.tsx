import { View, StatusBar, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LoginPage } from "@/app_components/LoginPage";


export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={() => router.push("/main")}>
        <LoginPage />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32D77D",
    justifyContent: "center",
    alignItems: "center",
  },
});