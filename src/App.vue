<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import firebase from "firebase/app";
import "firebase/firestore";
export default {
    name: "App",
    components: {
        HelloWorld,
    },

    mounted() {
        var db = firebase.firestore();
        db.collection("Users")
            .doc("User001")
            .set({
                isHide: true,
                registeredDate: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
