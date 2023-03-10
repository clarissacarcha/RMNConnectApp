import {Dimensions, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('window');

const getDeviceWidth = width;
const getDeviceHeight = height;
const getStatusbarHeight = getStatusBarHeight();

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = (size: any) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: any) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: any, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isIphoneXorAbove = () => {
  return Platform.OS === 'ios' && height >= 812;
};

export {
  scale,
  verticalScale,
  moderateScale,
  getDeviceWidth,
  getDeviceHeight,
  isIphoneXorAbove,
  getStatusbarHeight,
};
