import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';

import {Categories, Header} from './Components';
import {SIZES, COLORS} from 'src/constants';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux-hooks';
// import * as userActions from '../store/slices/userSlice';
// import * as playlistActions from '../store/slices/playlistSlice';
import * as trackPlayerActions from 'src/store/slices/trackPlayerSlice';
import {ref, onValue, push, update, remove} from 'firebase/database';
import {db} from 'src/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(trackPlayerActions.initAsync());
    // return () => dispatch(trackPlayerActions.resetPlayerAsync());
  }, [dispatch]);

  useEffect(() => {
    // console.log('haha', db);
    onValue(ref(db, '/users'), querySnapShot => {
      let data = querySnapShot.val() || {};
      console.log(data);
    });
  }, []);

  const handleAdd = () => {
    push(ref(db, '/users'), {
      first_name: 'Clarissa',
      last_name: 'Carcha',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Header />
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{color: 'white', paddingBottom: 50}}>ADD</Text>
        </TouchableOpacity>
        <Categories />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.paddingTopDefault,
    backgroundColor: COLORS.black,
  },
  contentWrapper: {
    paddingHorizontal: SIZES.paddingHorizontalDefault,
    paddingBottom: 90,
  },
});

export default Home;
