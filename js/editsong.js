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
  var storageRef = firebase.storage().ref()
  var urlCover; var urlAudio;var tren;
  
    const dbRef = firebase.database().ref()
    dbRef.child("playlist").child('trend').get().then((snapshot) => {
      if (snapshot.exists()) {
        tren = snapshot.val()
        showCover(tren)
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
              <a href="javascript:void();" class="album-poster" data-switch="${index}">
                  <img src="${tren[index].cover}" alt="">
              </a>
              <h4>${tren[index].name}</h4>
              <p>${tren[index].artist}</p>
          </div>
      `);
    }
    showEdit();
  }
  function musicplayer(){
    // for (let index = 0; index < tren.length; index++) {
    //   tren[index] = tren[index+1]
    // }
    // tren.splice(tren.length-1,tren.length)
    console.log(tren)
    $(".album-poster").on('click', function(e){
      console.log('asdasd')
      var dataSwitchId = $(this).attr('data-switch');
      var titlesong = tren[dataSwitchId].name;
        var artistsong = tren[dataSwitchId].artist
        var cover = tren[dataSwitchId].cover
        document.getElementById('numbersong').value = dataSwitchId
        document.getElementById('namesong').value = titlesong
        document.getElementById('artistsong').value = artistsong
        document.getElementById('coversong').src = cover
    });
     
  }
  function showEdit(){
    $(".album-poster").on('click', 'a',function(){
    console.log('AGASD')
      var urutan = $(this).attr('data-switch');
      var titlesong = tren[urutan].name
      var artistsong = tren[urutan].artist
      var cover = tren[urutan].cover
      document.getElementById('numbersong').value = urutan
      document.getElementById('namesong').value = titlesong
      document.getElementById('artistsong').value = artistsong
      document.getElementById('coversong').src = cover
    });
  }
  
  
  function uploadd(){
    var number = ceknumber()
    var name = cekname()
    var artist = cekartist()
    var cover = cekcover()
    var audio = cekaudio()
    var unique = Date.now()
    console.log(unique)
    if(number != 'false' || name != 'false' || artist != 'false'
        || cover != 'false'||audio != 'false'){
		 alert('Uploading...')
          storageCover(unique, cover, audio, number, name,artist)
        }
  }
  function ceknumber(){
    var a = document.getElementById('numbersong').value;
    if(a == ''){
      document.getElementById('alert-number').innerHTML = 'Please insert the number'
      return 'false';
    } else {
      document.getElementById('alert-number').innerHTML = ''
      return a;
    }
  }
  function cekname(){
    var a = document.getElementById('namesong').value;
    if(a == ''){
      document.getElementById('alert-name').innerHTML = 'Please insert the name'
      return 'false';
    } else {
      document.getElementById('alert-name').innerHTML = ''
      return a;
    }
  }
  function cekartist(){
    var a = document.getElementById('artistsong').value;
    if(a == ''){
      document.getElementById('alert-artist').innerHTML = 'Please insert the artist'
      return 'false';
    } else {
      document.getElementById('alert-artist').innerHTML = ''
      return a;
    }
  }
  function cekcover(){
    var file = document.getElementById('uploadCover')
    if(file.value == ''){
      document.getElementById('alert-cover').innerHTML = 'Please insert the cover'
      document.getElementById('coversong').src = 'https://www.bandshore.com/assets/frontend/images/music-no-img.png'    
      return 'false';
    } if (file.files[0].type != 'image/jpeg') {
      document.getElementById('alert-cover').innerHTML = 'Please insert the audio with .jpeg extension '
      document.getElementById('coversong').src = 'https://www.bandshore.com/assets/frontend/images/music-no-img.png'    
      return 'false'
    }else {
      document.getElementById('alert-cover').innerHTML = ''
      document.getElementById('coversong').src = URL.createObjectURL(file.files[0])
      return file;
    }
  }
  function cekaudio(){
    var file = document.getElementById('uploadSong')  
    if(file.value == ''){
      document.getElementById('alert-audio').innerHTML = 'Please insert the audio'
      return 'false';
    } if (file.files[0].type != 'audio/mpeg') {
      document.getElementById('alert-audio').innerHTML = 'Please insert the audio with .mp3 extension '
      return 'false'
    }
    else {
      document.getElementById('alert-audio').innerHTML = ''
      return file;
    }
  }
  function storageCover(filename, pict, audio,number, name,artist){
      var metadata = {
        contentType: 'image/jpeg'
      };  
    var uploadTask = storageRef.child('image/' + filename +'.jpg').put(pict.files[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.log(error.code)
        return ''
      }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          urlCover = downloadURL
          storageAudio(filename, audio,number, name,artist)
        });
      }
    );
  }
  function storageAudio(filename, audio,number, name,artist){
    var metadata = {
      contentType: 'audio/mpeg'
    };  
  var uploadTask = storageRef.child('audio/' + filename +'.mp3').put(audio.files[0], metadata);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      console.log(error.code)
      return ''
    }, 
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        urlAudio = downloadURL
        savetodb(filename, number, name,artist);
      });
    }
  );
  }
  function savetodb(filename, number, name,artist){
    firebase.database().ref('playlist/trend/' + number).set({
      name: name,
          artist: artist,
          url: urlAudio,
          cover: urlCover,
          filename: filename
      }, (error) => {
      if (error) {
      console.log(error)
      }
    })
    alert('Uploading Files Sucess')
  }
  
  function deleteBtn(){
      id = document.getElementById('numbersong').value
      filename = tren[id].filename
      storageRef.child('audio/' + filename +'.mp3').delete()
      storageRef.child('image/' + filename +'.jpg').delete()
      firebase.database().ref('playlist/trend/' + id).remove();
  }


  