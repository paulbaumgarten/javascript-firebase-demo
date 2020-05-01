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
    // Create our database (Firebase Cloud Firestore) object   
    let db = firebase.firestore();
    // Update the database using collection="profile" and documentid=user.email
    db.collection("profile").doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
            let record = doc.data();
            console.log("loggedIn read document "+user.email+" as:", record);
            document.querySelector("input[name='hometown']").value = record['hometown'];
            document.querySelector("input[name='dinnerguest']").value = record['dinnerguest'];
            document.querySelector("input[name='yeartobeborn']").value = record['yeartobeborn']
            document.querySelector("textarea[name='bio']").value = record['bio'];
        }
    }).catch(function(error) {
        console.log("loggedIn error reading document "+user.email+" as:", error);
    });
}

function update() {
    // Verify we are logged in
    let user = firebase.auth().currentUser;
    if (user) {
        // Create our JSON object to store
        let record = {};
        record['name'] = user.displayName;
        record['email'] = user.email;
        record['hometown'] = document.querySelector("input[name='hometown']").value;
        record['dinnerguest'] = document.querySelector("input[name='dinnerguest']").value;
        record['yeartobeborn'] = document.querySelector("input[name='yeartobeborn']").value;
        record['bio'] = document.querySelector("textarea[name='bio']").value;
        // Create our database object
        let db = firebase.firestore();
        // Update the database using collection="profile" and documentid=user.email
        db.collection("profile").doc(user.uid).set(record).then(function() {
            console.log("update successful for "+user.email);
        }).catch(function(error) {
            console.log("update error for "+user.email, error);
        });
    }
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
