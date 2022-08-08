var firebaseConfig = {
    apiKey: "AIzaSyDpqV83PEF-80t01ZdA_dpYQDrXZnRzbY4",
    authDomain: "test1-120621.firebaseapp.com",
    databaseURL: "https://test1-120621-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test1-120621",
    storageBucket: "test1-120621.appspot.com",
    messagingSenderId: "232225463667",
    appId: "1:232225463667:web:46226a32832f0e05c43906",
    measurementId: "G-KLPTD4YCX0"
  };
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
var userStatus;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userStatus = user.uid;
        console.log(userStatus);
        getData();
    } else {
        userStatus = null;
    }
});

function getData(){

    database.ref("user").child(userStatus).once("value", function(snapshot) {
        if (snapshot.exists()) {
            console.log(snapshot.val().username);
            $('#usr-id').text(snapshot.val().username);
            $('#usr-login').text(snapshot.val().username);
            $('#usr-name').text(snapshot.val().username);
            $('#usr-lgn').text(snapshot.val().username);
        } else {
            console.log("data Empty")
        }
    }).catch((error) => {
        console.error(error);
    });

}