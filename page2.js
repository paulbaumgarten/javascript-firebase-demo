"use strict";   // Mandate variables to be declared

function loggedIn() {
    /* 
    loggedIn()
    Will be run by every page when it has finished loading if we are logged in 
    */

    /* Get the user profile of our logged in user */
    let user = firebase.auth().currentUser;
    /* We are at page 2, let's display information about our user */
    document.querySelector("#welcome").innerHTML = "Welcome "+user.displayName;
    let img = document.querySelector("#profilePic");
    img.src = user.photoURL;
}

function main() {
    console.log("index.js/main running...");
    /* 
       onAuthStateChanged() 
       will run everytime our authentication state changes, 
       meaning every time we become logged in, or logged out. 
    */
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("onAuthStateChanged", user);
        if (user) {  /* If we are logged in */
            /* Let the loggedIn() function do the work */
            loggedIn(); 
        } else {    /* If we are not logged in */
            /* Go to the index page if we aren't there already */
            if (document.location.pathname !== "/") {
                document.location = "/";
            }
        }
    });
}

/* When the web browser has finished loading everything, run our main() function */
window.onload=main;
