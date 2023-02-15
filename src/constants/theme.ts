import {moderateScale} from 'src/utils';
export const COLORS = {
  primary: '#1DB954',
  primaryDark: '#707070',
  black: '#111111',
  white: '#fff',
  lightGray: '#d1d1d1',
  lightGray2: '#363636',
  lightGray3: '#323338',
  lightBlue: '#e3ecf9',
  blue: '#4180f1',
};

export const FONTS = {
  h1: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(32)},
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(24),
  },
  h3: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(18)},
  h4: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(16)},
  h5: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(13)},
  body: {fontFamily: 'Poppins-Regular', fontSize: moderateScale(13)},
  bodyBold: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(13)},
  menuText: {fontFamily: 'Poppins-Regular', fontSize: moderateScale(14)},
  btn: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(14)},
  greeting: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(16)},
  cardItemText: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(11),
  },
  cardItemSubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(11),
  },
  p: {fontFamily: 'Poppins-Regular', fontSize: moderateScale(11)},
  icon: {fontFamily: 'Poppins-Bold', fontSize: moderateScale(8)},
};

export const SIZES = {
  paddingDefault: moderateScale(15),
  paddingTopDefault: moderateScale(15),
  paddingBottomDefault: moderateScale(15),
  paddingHorizontalDefault: moderateScale(15),
};
