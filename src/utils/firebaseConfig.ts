import firebase from '@react-native-firebase/app';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBq5gtfsH-mrhpjQNUCM7MEYuAN8cWG7A4',
  authDomain: 'rmn-connect-app.firebaseapp.com',
  databaseURL: 'https://rmn-connect-app-default-rtdb.firebaseio.com',
  projectId: 'rmn-connect-app',
  storageBucket: 'rmn-connect-app.appspot.com',
  messagingSenderId: '1053099296823',
  appId: '1:1053099296823:android:f649291a994b4efdb817b2',
};

const app = firebase.initializeApp(firebaseConfig);
const db = {};
const firebaseAuth = auth();
export {db, auth};
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import auth from '@react-native-firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBq5gtfsH-mrhpjQNUCM7MEYuAN8cWG7A4',
//   authDomain: 'rmn-connect-app.firebaseapp.com',
//   databaseURL: 'https://rmn-connect-app-default-rtdb.firebaseio.com',
//   projectId: 'rmn-connect-app',
//   storageBucket: 'rmn-connect-app.appspot.com',
//   messagingSenderId: '1053099296823',
//   appId: '1:1053099296823:android:f649291a994b4efdb817b2',
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const firebaseAuth = firebaseApp.auth();

// const provider = new firebase.auth.GoogleAuthProvider();

// export {firebaseAuth, provider, firebaseApp};

// const onValueChange = db()
// .ref('/users')
// .on('value', snapshot => {
//   console.log(snapshot);
// });
