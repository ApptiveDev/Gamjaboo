import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const calendarWidth = screenWidth * 0.85;
const cellSize = Math.floor((calendarWidth - screenWidth * 0.01 * 7) / 7);

interface CustomCalendarGridProps {
  rows: (number | null)[][];
  selectedMonth: number;
}

export function CustomCalendarGrid({ rows, selectedMonth }: Readonly<CustomCalendarGridProps>) {
  const router = useRouter();
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;

  return (
    <View>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((d, colIdx) =>
            d === null ? (
              <View key={colIdx} style={styles.emptyCell} />
            ) : (
              // 날짜 누르면 지출 작성 화면으로 넘어감
              <TouchableOpacity 
                key={colIdx}
                onPress={() => {
                  const selectedDate = new Date(today.getFullYear(), selectedMonth - 1, d);
                  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];
                  const weekday = weekdayNames[selectedDate.getDay()];

                  router.push({
                    pathname: "/main/expense_record",
                    params: { 
                      day: d.toString(), 
                      month: selectedMonth.toString(),
                      weekday: weekday 
                    }
                  });
                }}
                style={[
                  styles.dayCell,
                  d === todayDate && selectedMonth === todayMonth && styles.todayCell]}>
                <Text style={[
                    styles.dayText,
                    d === todayDate && selectedMonth === todayMonth && styles.todayText]}>
                    {d}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: "row", 
    justifyContent: "center",
  },
  emptyCell: { 
    width: cellSize, 
    height: cellSize * 1.28, 
    borderRadius: cellSize * 0.4,
    justifyContent: "flex-end", 
    alignItems: "flex-start",
    backgroundColor: "#FCFFF6",
    paddingLeft: screenWidth * 0.02,
    paddingBottom: screenHeight * 0.015,
    margin: screenWidth * 0.0015,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  dayCell: { 
    width: cellSize, 
    height: cellSize * 1.28, 
    borderRadius: cellSize * 0.4, 
    justifyContent: "flex-end", 
    alignItems: "flex-start",
    backgroundColor: "#FCFFF6",
    paddingLeft: screenWidth * 0.02,
    paddingBottom: screenHeight * 0.015,
    margin: screenWidth * 0.0015,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  dayText: { 
    fontSize: screenWidth * 0.025, 
    color: "#567A3C", 
    fontWeight: "500" 
  },
  todayCell: {
    backgroundColor: "#FFFA9C",
  },
  todayText: {
    color: "#567A3C",
    fontWeight: "bold",
  }, 
});
