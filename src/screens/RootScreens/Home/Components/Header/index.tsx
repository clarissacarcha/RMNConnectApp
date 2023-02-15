import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SIZES, COLORS, FONTS} from 'src/constants';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>RMN SIKAT</Text>
      <Text style={styles.headerSubText}>Hi Juan, Chill muna tayo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.paddingTopDefault,
    paddingBottom: SIZES.paddingBottomDefault,
  },
  headerTitle: {
    color: COLORS.white,
    ...FONTS.h1,
  },
  headerSubText: {
    color: COLORS.white,
    paddingBottom: SIZES.paddingBottomDefault,
  },
});

export default Home;
