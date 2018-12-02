import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBlJDM1kIGR6BThYsOhQz7JSSnWgvwQXVI",
  authDomain: "tiva11marioplan.firebaseapp.com",
  databaseURL: "https://tiva11marioplan.firebaseio.com",
  projectId: "tiva11marioplan",
  storageBucket: "tiva11marioplan.appspot.com",
  messagingSenderId: "1084970792058"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true})
export default firebase //This is a special case where export default is OK
