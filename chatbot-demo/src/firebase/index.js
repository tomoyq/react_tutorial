import firebase from 'firebase/compat/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/firestore'
import firebaseConfig from './config'

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
 