import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
import DropDownBtn from "@/app_assets/expense_report_screen/write_screen/dropdownBtn.svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const spentBg = [
  "교통", "식비", "여가", "생활", "기타", "고정 지출"
];

export function SpentBgPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState<string>("교통");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (bg: string) => {
    setSelectedBg(bg);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>

      {/* 드롭다운 */}
      <TouchableOpacity 
        style={[styles.dropdownHeader, isOpen && styles.openHeader]} 
        onPress={toggleDropdown}>
        <Text style={styles.selectedText}>{selectedBg}</Text>
        <DropDownBtn />
      </TouchableOpacity>

      {/* 드롭다운 항목 */}
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {spentBg.map((bg) => (
            <TouchableOpacity 
              key={bg} 
              onPress={() => handleSelect(bg)} 
              style={styles.menuItem}>
              <Text style={styles.menuText}>{bg}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: "75%",
    overflow: "visible",
  },
  dropdownHeader: {
    width: "100%",
    height: "100%",
    padding: screenWidth * 0.025,
    backgroundColor: "#75E88C",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: screenWidth * 0.05,
    zIndex: 1,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  openHeader: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectedText: {
    color: "#fff",
    fontSize: screenWidth * 0.04,
  },
  dropdownMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#75E88C",
    borderRadius: screenWidth * 0.05,
    zIndex: 2,
  },
  menuItem: {
    padding: screenHeight * 0.01,
  },
  menuText: {
    fontSize: screenWidth * 0.04,
    color: "#fff",
  },
});




