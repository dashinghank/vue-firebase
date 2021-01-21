<template>
    <div id="app">
        <div id="recaptcha-container"></div>
        <input v-model="verifierCode" /><button @click="phoneVerify">輸入電話驗證碼</button><button @click="googleVerify">輸入google驗證碼</button>
        <button @click="createAccount">創建</button>
        <button @click="emailVerification">認證信箱</button>
        <button @click="signinBased">登入</button>
        <button @click="signOut">登出</button>
        <button @click="checkUser">使用者資訊</button>
        <button @click="setUsersEmail">重設email</button>
        <button @click="setUsersPassword">重設密碼</button>

        <button @click="linkWithPhone">連結</button>
    </div>
</template>
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase.js"></script>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
export default {
    name: "App",
    components: {},
    data() {
        return {
            verifierCode: "",
            confirmationResult: null,
        };
    },
    mounted() {
        firebase.auth().useDeviceLanguage();
        // firebase
        //     .auth()
        //     .signInWithEmailAndPassword("dashing.hankaa@gmail.com", "123aaaa")
        //     .then((user) => {
        //         console.log(user);
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log(error);
        //     });
        // const phoneNumber = "+886983075462"; //這裡暫且寫死
        // const appVerifier = window.recaptchaVerifier;
        // firebase
        //     .auth()
        //     .signInWithPhoneNumber(phoneNumber, appVerifier)
        //     .then((confirmationResult) => {
        //         this.confirmationResult = confirmationResult;
        //         console.log(this.confirmationResult);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    },
    methods: {
        linkWithPhone() {
            const phoneNumber = "+886983075462"; //這裡暫且寫死
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");

            firebase
                .auth()
                .getRedirectResult()
                .then((result) => {
                    if (result.credential) {
                        var credential = result.credential;
                        var token = credential.accessToken;
                    }
                    var user = result.user;
                    if (user != null) {
                        user.linkWithPhoneNumber(phoneNumber, window.recaptchaVerifier).then((result) => {
                            console.log("ggggggggggg:" + result);
                        });
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    console.log(error);
                });
        },
        createAccount() {
            console.log("createAccount");
            firebase
                .auth()
                .createUserWithEmailAndPassword("dashing.hank@gmail.com", "000000")
                .then((user) => {
                    console.log(user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    console.log(error);

                    // ..
                });
        },
        setUsersEmail() {
            var user = firebase.auth().currentUser;
            if (user != null) {
                user.updateEmail("dashing.hank@gmail.com")
                    .then(() => {
                        console.log("success");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        setUsersPassword() {
            var user = firebase.auth().currentUser;
            if (user != null) {
                user.updatePassword("111111")
                    .then(() => {
                        console.log("success");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        signinBased() {
            console.log("signinBased");

            let email = "abc";
            let password = "123";
            firebase
                .auth()
                .signInWithEmailAndPassword("dashing.hank@gmail.com", "111111")
                .then((user) => {
                    console.log("登入成功 ");
                    console.log(user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);

                    console.log(error);

                    // ..
                });
        },
        signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    // Sign-out successful.
                    console.log("successful");
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        },
        checkUser() {
            console.log(firebase.auth().currentUser);
            console.log(firebase.auth().currentUser.emailVerified);
        },
        emailVerification() {
            console.log("信箱認證");
            var user = firebase.auth().currentUser;

            user.sendEmailVerification()
                .then(function() {
                    // Email sent.
                    console.log("sent");
                })
                .catch(function(error) {
                    // An error happened.
                    console.log(error);
                });
        },
        googleVerify() {
            console.log("googleSignInRedirect");
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
        phoneVerify() {
            this.confirmationResult
                .confirm(this.verifierCode)
                .then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(result);
                    console.log(user.uid);
                })
                .catch((error) => {
                    console.log(error);
                });
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
