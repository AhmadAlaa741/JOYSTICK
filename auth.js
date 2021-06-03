//.. signup parametrs
var signup_email = document.getElementById("up-email");
var signup_pass = document.getElementById("up-password");


//.. sign in parametrs 
var signin_email = document.getElementById("in-email");
var signin_pass = document.getElementById("in-password");

//.. signup/in buttons
var signup = document.getElementById("signup-btn");
var signin = document.getElementById("signin-btn");


//.. signup form parametrs
var Name = document.getElementById('Name');
var username = document.getElementById('user@name');
var age = document.getElementById('Age');
var email = document.getElementById('up-email');
var pass = document.getElementById('up-password');
var pass2 = document.getElementById('pass2');



const rootRef = db.ref('users');


signup.addEventListener('click',(e)=>{

    e.preventDefault();

    

    auth.createUserWithEmailAndPassword(signup_email.value, signup_pass.value)
        .then((userCredential) => {
            window.location.href="games.html";
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });

        const autoId = rootRef.push().key
        rootRef.child(autoId).set({
            Name :Name.value,
            Username : username.value,
            Age : age.value,
            Email  : email.value,
            Password : pass.value
        });

});

signin.addEventListener('click',(e)=>{

    e.preventDefault();

    auth.signInWithEmailAndPassword(signin_email.value, signin_pass.value)
    .then((userCredential) => {
        window.location.href="games.html";
    })
    .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
    });

});

function logout(){
    auth.signOut().then(() => {
        window.location.href="index.html";
    }).catch((error) => {
        alert("error");
    });
}
  /*  
auth.onAuthStateChanged(function (user) {
    if (user) {
        userinfo.style.display = "block";
    } else {
        userinfo.style.display = 'none';
    }
});
*/

function validatePass(){
    if(pass.value===""){
        alert('please enter password ');
    }else if(pass2.value===""){
        alert('please enter verfication password ');
    }else if(pass.value != pass2.value){
        alert('password error');
    }else return true;
}
