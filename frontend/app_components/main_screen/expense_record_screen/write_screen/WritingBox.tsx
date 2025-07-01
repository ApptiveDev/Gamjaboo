import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export function WritingBox() {
  const [text, setText] = useState("");

  return (
    <TouchableOpacity style={styles.container}>
      <TextInput
        style={{ fontSize: screenWidth * 0.04 }}
        value={text}
        onChangeText={setText}
        multiline
        placeholder={"구매를 하고 어떤 기분이 들었나요?\n자유롭게 적어주세요!"}
        placeholderTextColor="#959595"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: screenWidth * 0.06,
    borderColor: "#959595",
    borderWidth: 1,
    padding: screenWidth * 0.05,
  },
})