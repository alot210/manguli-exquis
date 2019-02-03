import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAYyXg8VkGWkRnUPwfLRP89BFYnrYri4bA",
    authDomain: "manguli-exquis.firebaseapp.com",
    databaseURL: "https://manguli-exquis.firebaseio.com",
    storageBucket: "manguli-exquis.appspot.com"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
