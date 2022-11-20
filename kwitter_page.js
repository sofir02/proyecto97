var firebaseConfig = {
    apiKey: "AIzaSyBOitFEwAkzVjH2FUl-SAc8gAE_P3wyr1I",
    authDomain: "kwitter-1aa2e.firebaseapp.com",
    databaseURL: "https://kwitter-1aa2e-default-rtdb.firebaseio.com",
    projectId: "kwitter-1aa2e",
    storageBucket: "kwitter-1aa2e.appspot.com",
    messagingSenderId: "27981812884",
    appId: "1:27981812884:web:b196e91e2cab11d1179081"
  };
 firebase.initializeApp(firebaseConfig);
 user_name= localStorage.getItem("user_name");
 room_name= localStorage.getItem("room_name");
 
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}

function getData(){
    firebase.database().ref("/" + room_name).on('value' , function (snapshot){
        document.getElementById("output").innerHTML="";
        snapshot.forEach(function (childSnapshot) {
            childKey= childSnapshot.key;
            childData=childSnapshot.val();
            if(childKey != "purpose"){
                firebase_message_id = childKey;
                message_data = childData;
                name= message_data['name'];
                message = message_data ['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + name + "<img class = 'user_tick' src='tick.png'> </h4>";
                message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
                like_button = "<button class = 'btn btn-warning' id=" + firebase_message_id + " value = " + like + " onclick = 'updateLike(this.id)'>  ";
                span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                
                
            }
        });
            
        });
            
        }

   getData();

   function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name, 
        message: msg, 
        like: 0
    });
    document.getElementById("msg").value = "";
   }

   function updateLike(message_id){
    console.log ("el botón de like" + message_id + "ha sido presionado");
    button_id = message_id;
    likes = document.getElementById(button_id).value;
 update_likes= Number(likes) + 1;
 console.log(update_likes);
 firebase.database().ref(room_name).child(message_id).update({
    like: update_likes
 });
   }
