<template>
    <div id="app">
        <label>Account:</label><input v-model="inputAccount" /><button @click="login">登入</button><button @click="logout">登出</button>
        <br />
        <div v-for="(key, index) in chatroomKeys" :key="index">
            <button @click="subChatroom">{{ key }}</button>
        </div>

        <textarea v-bind:value="bindContent" disabled="true" rows="6" cols="40"></textarea>
        <br />
        <input v-model="inputText" /><button @click="text">輸入</button>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
    name: "App",
    components: {},
    data() {
        return {
            inputAccount: "",
            bindContent: "",
            inputText: "",
            refChatroom: "",
            currentAccount: "",
            chatroomKeys: [],
        };
    },
    mounted() {
        // var db = firebase.firestore();
        // usersRef
        //     .doc("User003")
        //     .set({
        //         registeredDate: firebase.firestore.Timestamp.fromDate(new Date()),
        //     })
        //     .then(function() {
        //         console.log("Document successfully written!");
        //     })
        //     .catch(function(error) {
        //         console.error("Error writing document: ", error);
        //     });
        var usersRef = firebase
            .firestore()
            .collection("/Users")
            .doc("User003");

        usersRef.update({ ada: firebase.firestore.FieldValue.delete() });

        // db.collection("Users")
        //     .delete();
        // db.collection("Chatrooms")
        //     .get()
        //     .then((doc) => {
        //         doc.forEach((childDoc) => {
        //             console.log(childDoc.id);
        //         });
        //     });
        // db.collection("Chatrooms")
        //     .add({
        //         createdTime: new Date(),
        //     })
        //     .then((doc) => doc.collection("contents").add({ account: "ggg" }));
    },
    methods: {
        login() {
            console.log("login");
            this.currentAccount = this.inputAccount;
            this.inputAccount = "";

            var db = firebase.firestore();
            db.collection("Chatrooms")
                .get()
                .then((doc) => {
                    doc.forEach((childDoc) => {
                        console.log(childDoc.id);
                        this.chatroomKeys.push(childDoc.id);
                    });
                });
        },
        subChatroom() {
            console.log("subChatroom");
            var chatroomKey = event.target.innerText;
            // var db = firebase.firestore();
            // db.collection("Chatrooms").off("value");
            this.bindContent = "";
            this.refChatroom = chatroomKey;
            console.log("現在聊天室位置" + this.refChatroom);

            // db.collection("Chatrooms")
            //     .doc(this.refChatroom)
            //     .onSnapshot((snapshot) => {
            //         this.onSubChatroom(this.refChatroom);
            //     });
        },
        // onSubChatroom(roomKey) {
        //     db.collection("Chatrooms").doc(roomKey).collection("contents")

        // },
        logout() {
            console.log("logout");
            this.currentAccount = "";
        },
        text() {
            console.log("text");
            var db = firebase.firestore();
            var time = Date.now();
            if (this.refChatroom == "" || this.inputText == "" || this.currentAccount == "") {
                return;
            }
            db.collection("Chatrooms")
                .doc(this.refChatroom)
                .collection("contents")
                .add({
                    account: this.currentAccount,
                    text: this.inputText,
                    timestamp: time,
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

            this.modelContent = "";
            this.bindContent = this.inputText;
            this.inputText = "";
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
