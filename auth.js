// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDZIxrnJEBPQHcV03cWLqaB1DTXQg0Be5Q",
    authDomain: "joystick-8c289.firebaseapp.com",
    databaseURL: "https://joystick-8c289-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "joystick-8c289",
    storageBucket: "joystick-8c289.appspot.com",
    messagingSenderId: "355605299009",
    appId: "1:355605299009:web:e05645716eee28c8676bc0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signup() {
    var email = document.getElementById("up-email");
    var pass = document.getElementById("up-password");

    auth.createUserWithEmailAndPassword(email.value, pass.value)
        .then((userCredential) => {
            window.location.href="games.html";
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}


function signin() {
    var email = document.getElementById("in-email");
    var pass = document.getElementById("in-password");

    auth.signInWithEmailAndPassword(email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            window.location.href="games.html";
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });

    
}


function logout() {
    auth.signOut().then(() => {
        window.location.href="index.html";
    }).catch((error) => {
        alert("error");
    });
}

auth.onAuthStateChanged(function (user) {
    if (user) {
        alert('useracticated');
    } else {
        alert('no active user');
    }
});

