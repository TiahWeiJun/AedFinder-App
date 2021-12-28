import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

import getDirections from "react-native-google-maps-directions";

const AedModal = ({ visible, closeModal, aedInfo }) => {
  if (!aedInfo) {
    return null;
  }

  const {
    AED_ID,
    OPERATING_HOURS,
    HOUSE_NUMBER,
    ROAD_NAME,
    BUILDING_NAME,
    UNIT_NUMBER,
    POSTAL_CODE,
    AED_LOCATION_DESCRIPTION,
    LATITUDE,
    LONGITUDE,
  } = aedInfo;

  const handleWalkingPress = () => {
    const data = {
      destination: {
        latitude: parseFloat(LATITUDE),
        longitude: parseFloat(LONGITUDE),
      },
      params: [
        {
          key: "travelmode",
          value: "walking", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  const handleCyclingPress = () => {
    const data = {
      destination: {
        latitude: parseFloat(LATITUDE),
        longitude: parseFloat(LONGITUDE),
      },
      params: [
        {
          key: "travelmode",
          value: "bicycling", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  const handleDrivingPress = () => {
    const data = {
      destination: {
        latitude: parseFloat(LATITUDE),
        longitude: parseFloat(LONGITUDE),
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <TouchableOpacity
          onPress={() => {
            closeModal();
          }}
          style={styles.centeredView}
        >
          <TouchableOpacity
            onPress={() => console.log("do nothing")}
            activeOpacity={1}
            style={styles.modalView}
          >
            {BUILDING_NAME ? (
              <Text style={styles.modalTitle}>{BUILDING_NAME}</Text>
            ) : null}

            <Text style={styles.modalText}>
              {`Blk ${HOUSE_NUMBER} ${ROAD_NAME} ${POSTAL_CODE}`}
            </Text>

            <Text
              style={styles.modalDescription}
            >{`${AED_LOCATION_DESCRIPTION}`}</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleWalkingPress}
            >
              <Text style={styles.buttonText}>Walking Directions</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleCyclingPress}
            >
              <Text style={styles.buttonText}>Cycling Directions</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleDrivingPress}
            >
              <Text style={styles.buttonText}>Driving Directions</Text>
            </Pressable>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AedModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "red",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalDescription: {
    marginBottom: 15,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
  },
});
