<template>
    <div id="app">
        <label for="emailadd">Account: </label>
        <input v-model="userAccount" name="emailadd" id="emailadd" /><button v-on:click="login">Login</button><button v-on:click="logout">Logout</button>
        <div v-for="(key, index) in chatroomKeys" :key="index">
            <button v-on:click="subChatroom">{{ key }}</button>
            <!-- <button v-on:click="unSubChatroom">{{ key }}</button> -->
        </div>
        <textarea v-bind:value="bindContent" name="mytext" rows="6" cols="40" required="true" readonly="true"> </textarea>
        <input v-model="modelContent" />
        <button v-on:click="enterText">輸入</button>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
export default {
    name: "App",
    components: {},
    data() {
        return {
            currentAccount: "",
            userData: null,
            userAccount: "",
            chatroomKeys: [],
            bindContent: "",
            modelContent: "",
            refChatroom: "",
            temp: "",
        };
    },
    mounted() {
        // db.ref().on("value", (snapshot) => {
        //     snapshot.forEach((childSnapshot) => {
        //         // var key = childSnapshot.key;
        //         // var data = childSnapshot.val();
        //         // console.log(childSnapshot.key);
        //         console.log(childSnapshot.val());
        //     });
        // });
        // db.ref().set({});
        ///資料庫全部聊天室
        // db.ref("Chatrooms").on("value", (snapshot) => {
        //     snapshot.forEach((chatRooms) => {
        //         console.log(chatRooms.key);
        //     });
        // });
        // var now = Date.now();
        //選擇聊天室
        // var newRef = db.ref("Chatrooms").push({
        //     createTime: now,
        // });
        // var chatroomKey = newRef.key;
        // db.ref("Users/User001/AvailableChatRooms").push(chatroomKey);
        // db.ref("Chatrooms").off("value");
    },
    methods: {
        login() {
            console.log("login");
            this.currentAccount = this.userAccount;
            console.log(this.currentAccount);
            this.userAccount = "";
            var db = firebase.database();

            db.ref("Users/" + this.currentAccount).once("value", (snapshot) => {
                this.userData = snapshot;

                this.userData.child("AvailableChatRooms").forEach((c) => {
                    console.log(c.val());
                    this.chatroomKeys.push(c.val());
                });
            });
        },
        logout() {
            console.log("logout");
            this.chatroomKeys = [];
            this.currentAccount = "";
            this.bindContent = "";
            this.refChatroom = "";
        },

        subChatroom() {
            console.log("subChatroom");
            var chatroomKey = event.target.innerText;
            var db = firebase.database();
            db.ref("Chatrooms").off("value");
            this.bindContent = "";

            this.refChatroom = chatroomKey;
            console.log("現在聊天室位置" + this.refChatroom);
            db.ref("Chatrooms")
                .child(chatroomKey + "/contents")
                .on("value", (snapshot) => {
                    // console.log(snapshot.val());
                    snapshot.forEach((d) => {
                        this.temp = this.temp + d.child("account").val() + ":" + d.child("text").val() + "\n";
                        console.log(d.child("account").val() + ":" + d.child("text").val());
                    });
                    this.bindContent = this.temp;
                    this.temp = "";
                });
        },

        unSubChatroom() {
            console.log("unSubChatroom");
            var chatroomKey = event.target.innerText;
            var db = firebase.database();
            db.ref("Chatrooms")
                .child(chatroomKey)
                .off("value");
            this.bindContent = "";
        },
        enterText() {
            console.log("enterText");
            var db = firebase.database();
            var time = Date.now();
            // db.ref("Chatrooms/" + this.refChatroom).push({ text: this.modelContent, timestamp: time });
            if (this.refChatroom == "" || this.modelContent == "" || this.currentAccount == "") {
                return;
            }
            db.ref("Chatrooms/" + this.refChatroom + "/contents").push({ account: this.currentAccount, text: this.modelContent, timestamp: time });

            // db.ref("Chatrooms")
            //     .child(this.refChatroom)
            //     .push({
            //         text: this.modelContent,
            //         timestamp: time,
            //     });

            this.modelContent = "";
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
