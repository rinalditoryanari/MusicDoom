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

  var mailformat = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]/;
  var passformat = /^(?=.{8,})/


function cekemail(){
  var email = document.getElementById('email').value;;
  if(email == ""){
    document.getElementById('alert-email').innerHTML = 'Please insert your email'
    return false;
  } else { 
    if(email.match(mailformat)){
      document.getElementById('alert-email').innerHTML = ''
      return email;
    } else {
      document.getElementById('alert-email').innerHTML = "Please insert your email correctly!"
      return false;
    }
  }
}
function cekpass(){
  var password = document.getElementById("pass").value;
  if(password == ""){
    document.getElementById('alert-pass').innerHTML = 'Please insert your password'
    return false;
  } else { 
    if(password.match(passformat)){
      document.getElementById('alert-pass').innerHTML = ''
      return password;
    } else {
      document.getElementById('alert-pass').innerHTML = "The password must be eight characters or longer!"
      return 'salah';
    }
  }
}
function cekname(){
  var name = document.getElementById('user').value;
  if(name == ''){
    document.getElementById('alert-name').innerHTML = 'Please insert your name'
    return false;
  } else {
    document.getElementById('alert-pass').innerHTML = ''
    return name;
  }
}
function loginlogin(){
  var email = cekemail()
  var password = cekpass()
  if(email != false || password != false){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          statuslogin()
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode +' '+ errorMessage)
          alert(errorMessage)
        }) 
  }
}
function statuslogin(){
  const user = firebase.auth().currentUser
  const dbRef = firebase.database().ref()
  dbRef.child("user").child(user.uid).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())
      if(snapshot.val().status == 'admin'){
        window.location.href = 'editsong.html'
      } else {
        window.location.href = 'home.html'
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
function signupup(){
  var email = cekemail()
  var password = cekpass()
  var name = cekname()
  if(email != false || password != false || name != false){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          var user = userCredential.user
          console.log("SUKSES DAFTAR")
          console.log(user)
          savetodb();
      })
      .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage)
      }) 
  }
}
function savetodb(){
  var name = document.getElementById('user').value;
  var pass = document.getElementById("pass").value;
  var mail = document.getElementById('email').value;;

  const  user = firebase.auth().currentUser
  firebase.database().ref('user/' + user.uid).set({
    userid : user.uid,
    email : mail,
    password : pass,
    username : name,
    status: 'user'
  }, (error) => {
      if (error) {
      console.log(error)
    } else {
      window.location.href = 'Login.html';
    }
  }); 
}