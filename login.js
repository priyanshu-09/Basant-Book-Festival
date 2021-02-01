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
            document.getElementById('login_button').innerHTML = "Welcome " +
                googleUser.getBasicProfile().getGivenName();
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
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
            console.log(result)
            localStorage.setItem("token", result.token);
            console.log(localStorage.getItem('token'))
        })
        .catch(error => console.log('error', error));


}
console.log(localStorage.getItem('token'))
startApp()