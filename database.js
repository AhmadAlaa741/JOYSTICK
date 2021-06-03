var Name = document.getElementById('Name');
var username = document.getElementById('user@name');
var email = document.getElementById('up-email');
var pass = document.getElementById('up-password');
var signedup = document.getElementById('signedup');

const rootRef = db.ref('users');

signedup.addEventListener('click',(e)=>{
    const autoId = rootRef.push().key
    rootRef.child(autoId).set({
        Name :Name.value,
        Username : username.value,
        Email  : email.value,
        Password : pass.value
    });
});

var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  var email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
  console.log(username);
  console.log(email);
});
