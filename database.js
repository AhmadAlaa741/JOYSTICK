var Name = document.getElementById('Name');
var username = document.getElementById('user@name');
var age = document.getElementById('Age');
var email = document.getElementById('up-email');
var pass = document.getElementById('up-password');
var signedup = document.getElementById('signedup');
var logout = document.getElementById('logout');

const rootRef = db.ref('users');

signedup.addEventListener('click',(e)=>{
    const autoId = rootRef.push().key
    rootRef.child(autoId).set({
        Name :Name.value,
        Username : username.value,
        Age : age.value,
        Email  : email.value,
        Password : pass.value
    });

    

});





