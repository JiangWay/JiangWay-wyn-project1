import firebase from 'firebase'
// import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyBtWqIOZEkE4hvgZWYlRGiYrSuRIJWMOZA',
  authDomain: 'wyn-account.firebaseapp.com',
  databaseURL: 'https://wyn-account.firebaseio.com',
  projectId: 'wyn-account',
  storageBucket: 'wyn-account.appspot.com',
  messagingSenderId: '87441434401',
  appId: '1:87441434401:web:c9b45ada9dc9015ffec060',
  measurementId: 'G-M4RD60DDX3'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
export default firebase.firestore()
