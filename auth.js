

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

