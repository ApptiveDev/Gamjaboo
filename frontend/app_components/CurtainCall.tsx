import { StatusBar, StyleSheet, Dimensions } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface Props {
  onSwipeDown: () => void;
};

export function CurtainCall({ onSwipeDown }: Readonly<Props>) {

  const onSwipe = (gestureName: string) => {
    if (gestureName === 'SWIPE_DOWN') {
      onSwipeDown();
    }
  };
  
  return (
    <GestureRecognizer
      onSwipe={onSwipe}
      style={styles.container}
      >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
    text: {
    fontSize: 30,
    fontWeight: "bold",
  },
})