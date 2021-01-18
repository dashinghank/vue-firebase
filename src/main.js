import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";

Vue.config.productionTip = false;
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIvpdDLI8wWsT2p_2_4Orxelt2M6oBfIw",
    // authDomain: "kfctesting-43746.firebaseapp.com",
    databaseURL: "https://kfctesting-43746.firebaseio.com",
    projectId: "kfctesting-43746",
    // storageBucket: "kfctesting-43746.appspot.com",
    // messagingSenderId: "613315452358",
    // appId: "1:613315452358:web:89cbc164f80b984f5ba6c7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
