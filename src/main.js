import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";

Vue.config.productionTip = false;
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCznQvp3_HDQyp7_-nbttSzzZ7xXTWPwjQ",
    authDomain: "miatreasure-fe805.firebaseapp.com",
    databaseURL: "https://miatreasure-fe805-default-rtdb.firebaseio.com",
    projectId: "miatreasure-fe805",
    storageBucket: "miatreasure-fe805.appspot.com",
    messagingSenderId: "321146916226",
    appId: "1:321146916226:web:c35903e6d9fcf5408f939b",
    measurementId: "G-LHBSF44FDN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
