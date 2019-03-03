import * as firebase from 'firebase';

import { FirebaseConfig } from './keys'

if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

const FirebaseDB = firebase.database()

//const dbRef = FirebaseDB.ref()

// Referência direta para 'eventos'
//const eventosRef = dbRef.child('eventos')

const FirebaseAuth = firebase.auth()

export { FirebaseDB, FirebaseAuth }