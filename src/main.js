import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";

Vue.config.productionTip = false;
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDZNE84me58oiLqmbdOF36JCRLO7HwWqaE",
    authDomain: "chatroom-90d89.firebaseapp.com",
    projectId: "chatroom-90d89",
    storageBucket: "chatroom-90d89.appspot.com",
    messagingSenderId: "384855080511",
    appId: "1:384855080511:web:b04dcaffd9dc06b1b1c28a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
