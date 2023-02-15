import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SIZES, COLORS, FONTS} from 'src/constants';
import {moderateScale} from 'src/utils';

interface props {
  title: string;
  onPress?: any;
}

const Category = ({title, onPress}: props) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground
      source={require('src/assets/images/image-placeholder.png')}
      style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const Categories = () => {
  const navigation = useNavigation();

  return (
    <>
      <Category title="FAVORITES" />
      <Category
        title="DRAMA/PODCAST"
        onPress={() => {
          navigation.navigate('Podcast');
        }}
      />
      <Category title="FM RADIO" />
      <Category title="RMN RADIO" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: SIZES.paddingBottomDefault + 5,
  },
  title: {
    color: COLORS.white,
    ...FONTS.h1,
  },
});

export default Categories;
