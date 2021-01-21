<template>
    <div id="app">
        <VueFileAgent v-model="fileRecords"></VueFileAgent>
        <button @click="put">上傳</button>
        <!-- // Or inserted into an <img> element:
                    // var img = document.getElementById("myimg");
                    // img.src = url; -->
        <img id="myimg" />
    </div>
</template>
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase.js"></script>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import Vue from "vue";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
Vue.use(VueFileAgent);

export default {
    name: "App",
    components: {},
    data() {
        return {
            url: "",
            fileRecords: [],
            uploadUrl: "http://localhost:8080/",
        };
    },
    mounted() {},
    methods: {
        put() {
            // console.log(this.fileRecords[0].file);
            // console.log("put");
            // var mountainsRef = storageRef.child("mountains.jpg");
            // var storageRef = firebase.storage().ref();
            // var mountainImagesRef = storageRef.child("imagestest/testing");
            // mountainImagesRef
            //     .put(this.fileRecords[0].file)
            //     .then((result) => {
            //         console.log("成功");
            //         console.log(result);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });

            var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child("imagestest/testzip");
            mountainImagesRef
                .getDownloadURL()
                .then(function(url) {
                    // `url` is the download URL for 'images/stars.jpg'
                    console.log("成功");
                    console.log(url);
                    // This can be downloaded directly:

                    var link = document.createElement("a");
                    link.href = url;
                    // link.download = "";
                    link.click();

                    // Or inserted into an <img> element:
                    // var img = document.getElementById("myimg");
                    // img.src = url;
                })
                .catch(function(error) {
                    // Handle any errors
                    console.log(error);
                });

            // var desertRef = storageRef.child("images/mountains.jpg");

            // // Delete the file
            // desertRef
            //     .delete()
            //     .then(function() {
            //         console.log("success");
            //         // File deleted successfully
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //         // Uh-oh, an error occurred!
            //     });
        },
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
