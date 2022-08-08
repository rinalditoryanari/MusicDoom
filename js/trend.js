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

var player; var tren; var ayam

  const dbRef = firebase.database().ref()




$(document).ready(function() {
    console.log("ready!");
});

  dbRef.child("playlist").child('trend').get().then((snapshot) => {
    if (snapshot.exists()) {
      tren = snapshot.val()
      showCover(tren)
      // queque(tren)
      musicplayer()
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

function showCover(tren){
  for (let index = 1; index < tren.length; index++) {
    $('main').append(`
        <div class="album-grid">
            <a href="javascript:void();" class="album-poster" data-switch="${index-1}">
                <img src="${tren[index].cover}" alt="">
            </a>
            <h4>${tren[index].name}</h4>
            <p>${tren[index].artist}</p>
        </div>
    `);
  }
}
function musicplayer(){
  for (let index = 0; index < tren.length; index++) {
    tren[index] = tren[index+1]
  }
  tren.splice(tren.length-1,tren.length)
  console.log(tren)
  $(".album-poster").on('click', function(e){
    var dataSwitchId = $(this).attr('data-switch');
    ap1.list.switch(dataSwitchId);
    ap1.play();
    $("#aplayer").addClass('showPlayer');
  });
  const ap1 = new APlayer({
    container: document.getElementById('aplayer'),
     listFolded: true,
     audio:tren
    });
    console.log(ap1)  
}



 
