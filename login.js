if (sessionStorage.getItem('name') != undefined) {
    document.getElementById('login_button').innerHTML = "Welcome " + sessionStorage.getItem('name')
    document.getElementsByClassName('cart')[0].style.display = 'block'
    document.getElementsByClassName('log_out')[0].style.display = 'flex'
}


var googleUser = {};
var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '681636635176-ies3cblqevrapsbdlvegihfia6pu8tnd.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('login_button'));
    });
};

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            onSignIn(googleUser)
            document.getElementById('login_button').innerHTML = "Welcome " +
                googleUser.getBasicProfile().getGivenName();
            document.getElementsByClassName('cart')[0].style.display = 'block'
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementsByClassName('cart')[0].style.display = 'none'
        document.getElementsByClassName('log_out')[0].style.display = 'none'
        document.getElementById('login_button').innerHTML = 'Log In using BITS Mail'
    });

}
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    authenticate(id_token)
}
function authenticate(id_token) {
    var formdata = new FormData();
    formdata.append("id_token", id_token);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://bbf.bits-pilani.ac.in/api/auth/authenticate/", requestOptions)
        .then(response => response.json())
        .then(result => {
            sessionStorage.clear();
            console.log(result)
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("name", result.first_name)
        })
        .catch(error => alert(error));


}
startApp()