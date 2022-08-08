

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
        } else {
            console.log("data Empty")
        }
    }).catch((error) => {
        console.error(error);
    });
 }