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
 document.getElementById("user_name").innerHTML= " Hola " + user_name;
 function addRoom(){
    room_name= document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose : "sala agregada"
    });

    localStorage.setItem("room_name" , room_name);
    window.location.replace("kwitter-page.html");

}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}
 
function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name" , name );
    window.location="kwitter-page.html";

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
