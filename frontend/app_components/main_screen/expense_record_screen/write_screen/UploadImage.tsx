import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker"
import Modal from "react-native-modal";
import UploadIcon from "@/app_assets/expense_report_screen/write_screen/pictureBtn.svg";
import Camera from "@/app_assets/expense_report_screen/write_screen/camera.svg";
import Gallery from "@/app_assets/expense_report_screen/write_screen/gallery.svg";
import Cancel from "@/app_assets/expense_report_screen/write_screen/cancelBtn.svg";


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface UploadImageProps {
  image: string | null;
  setImage: (uri: string) => void;
}

export function UploadImage({ image, setImage }: Readonly<UploadImageProps>) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // 카메라로 사진 찍기
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      closeModal();
    }
  };

  // 갤러리에서 사진 가져오기
  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      closeModal();
    }
  };

  return (
    <View>
      <TouchableOpacity 
        onPress={openModal} 
        style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <UploadIcon />
        )}
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}>

        <TouchableOpacity onPress={closeModal} style={styles.modalClose}>
          <Cancel />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <TouchableOpacity onPress={takePhoto} style={styles.modalOption}>
            <Camera />
            <Text style={styles.text}>카메라로 촬영하기</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickFromGallery} style={styles.modalOption}>
            <Gallery />
            <Text style={styles.text}>앨범에서 선택하기</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    color: "#329257",
    fontSize: screenWidth * 0.04,
  },
  modal: {
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingHorizontal: screenWidth * 0.1,
    paddingVertical: screenHeight * 0.035,
    borderTopLeftRadius: screenWidth * 0.1,
    borderTopRightRadius: screenWidth * 0.1,
  },
  modalOption: {
    flexDirection: "row",
    width: screenWidth * 0.6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: screenWidth * 0.04,
    margin: screenWidth * 0.015,
    borderRadius: screenWidth * 0.1,
    gap: screenWidth * 0.02,
    // shadow at ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 5,
  },
  modalClose: {
    alignItems: "center",
    paddingBottom: screenWidth * 0.05,
  },
})