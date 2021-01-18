<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import firebase from "firebase/app";
import "firebase/database";
export default {
    name: "App",
    components: {
        HelloWorld,
    },

    mounted() {
        var db = firebase.database();
        db.ref().once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                // var key = childSnapshot.key;
                // var data = childSnapshot.val();
                console.log(childSnapshot.key());
                console.log(childSnapshot.val());
            });
        });

        // db.ref().once("value", (snapshot) => {
        //     console.log(snapshot.val());
        // });
        // db.ref()
        //     .child("name/middle")
        //     .remove();

        // db.ref("name").push({
        //     title: "middle",
        //     description: "resetmid",
        // });

        // // update

        // db.ref()
        //     .child("name")
        //     .update({
        //         first: "updateft",
        //     });

        // set
        // db.ref().set({
        //     name: {
        //         first: "first",
        //         last: "last",
        //         middle: "mid",
        //     },
        // });

        // database.ref().set({
        //     name: {
        //         first: "setfirst",
        //         last: "setlast",
        //         middle: "setmid",
        //     },
        // });
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
