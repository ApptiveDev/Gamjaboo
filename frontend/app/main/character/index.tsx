import { View, Text, StatusBar, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function CharacterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.clothBtn}
        onPress={() => router.push("/main/character/customizing")}>
        <Image source={require("@/assets/images/cloth.png")} />
      </TouchableOpacity>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={() => router.push("/main")}>
        <Text style={styles.text}>Character Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFFF6",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  clothBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
    width: screenWidth * 0.14,
    height: screenHeight * 0.07,
    borderRadius: screenWidth,
    backgroundColor: "#fff",
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
});