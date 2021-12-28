import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  ScrollView,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const handleCPRCourse = () => {
    const url =
      "https://www.redcross.sg/get-trained/first-aid-and-psychosocial-support.html";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Error occured");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        <Text style={styles.heading}>Features </Text>
        <Text style={{ marginBottom: 5 }}>
          1) Users can find the nearest AED from them with directions available
        </Text>
        <Text style={{ marginBottom: 5 }}>
          2) Users can call for emergency through this App
        </Text>
        <Text style={{ marginBottom: 20 }}>
          3) Users can follow step by step CPR instructions through this App
        </Text>

        <Text style={styles.heading}>Learn to save a life </Text>
        <Image
          source={require("../assets/cprCourse.jpg")}
          style={styles.stretch}
        />
        <View style={{ marginBottom: 20 }}>
          <Button
            onPress={handleCPRCourse}
            title="Learn More"
            color="#ff8533"
          />
        </View>

        <Text style={styles.heading}>What is Cardiac Arrest </Text>
        <Image
          source={require("../assets/cardiacArrest.jpg")}
          style={styles.infoGraphic}
        />

        <Text style={styles.heading}>Cardiac Arrest Facts </Text>
        <Text style={{ marginBottom: 5 }}>
          1) Annually, more than 2,300 Singaporeans suffer from cardiac arrest,
          of which only 3% survive
        </Text>
        <Text style={{ marginBottom: 5 }}>
          2) Cardiac arrest is reversible in most victims if it's treated within
          a few minutes
        </Text>
        <Text style={{ marginBottom: 5 }}>
          3) Every second matters as chances of survival drops by 7% to 10%
          every minute
        </Text>
        <Text style={{ marginBottom: 20 }}>
          4) Bystander CPR is shown to double survival rates
        </Text>

        <Text style={styles.heading}>Lower Risk of Cardiac Arrest </Text>
        <Image
          source={require("../assets/protectHeart.png")}
          style={styles.heartPic}
        />

        <View style={{ marginBottom: 20 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  stretch: {
    width: "100%",
    height: 450,
    resizeMode: "stretch",
    marginBottom: 3,
  },

  heartPic: {
    width: "100%",
    height: 300,
    resizeMode: "stretch",
    marginBottom: 2,
  },
  infoGraphic: {
    width: "100%",
    height: 550,
    resizeMode: "stretch",
    marginBottom: 15,
  },
});
