import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import CharacterImg from "@/app_assets/customizing_screen/characterImg.svg";
import SkinFill from "@/app_assets/customizing_screen/skinFill.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function ChooseCloth() {
  return (
    <ScrollView style={styles.container}>


      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.rowContainer1}>
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
        <CharacterImg />
      </View>

      <View style={styles.rowContainer2}>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.priceContainer}>
          <SkinFill />
          <Text style={styles.text}>5</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight * 0.45,
  },
  rowContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    padding: screenWidth * 0.03,
    gap: screenWidth * 0.03,
  },
  rowContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: screenWidth * 0.03,
    gap: screenWidth * 0.15,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: screenWidth * 0.03,
  },
  text: {
    color: "#ADD69F",
    fontWeight: "bold",
    fontSize: screenWidth * 0.04,
  },
})