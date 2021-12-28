import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { instructionsList } from "../data/instructions";

const { width: viewportWidth } = Dimensions.get("window");
const sliderWidth = viewportWidth;
const itemWidth = viewportWidth;

const InstructionScreen = () => {
  const ref = useRef(null);
  //   const [activeIndex, setActiveIndex] = useState(0);
  const [carouselList, setCarouselList] = useState(instructionsList);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={styles.itemStyle}>
        <Text style={styles.footer}>
          If at any point the paramedics arrive, let them take over and update
          accordingly
        </Text>
        <Image style={styles.image} source={item.image} />

        <Text style={styles.title}>{item.title}</Text>
        {item.text.map((str, i) => (
          <Text key={i} style={styles.text}>
            {str}
          </Text>
        ))}
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <View style={styles.foregroundScreen}>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselList}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          renderItem={renderItem}
          //   onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default InstructionScreen;

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: "floralwhite",
    borderRadius: 5,
    height: 550,
    padding: 15,
    margin: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  backgroundScreen: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    paddingTop: 50,
  },
  foregroundScreen: { flex: 1, flexDirection: "row", justifyContent: "center" },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginBottom: 7,
    color: "green",
  },
  footer: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    fontSize: 15,
  },
});
