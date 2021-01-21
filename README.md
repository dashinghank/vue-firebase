# 專案名稱

Firebase Firestore in Vue

# 簡介

firebase 各種認證

### 語言 :

JavaScript

### 主旨 :

1. 電話認證
2. google 認證
3. 密碼認證

# 快速開始

## 環境建立

1. VS Code
2. Vue 環境建立

```powershell
yarn global add @vue/cli
yarn global add @vue/cli-service-global
```

## 專案建立

1. 在 vue 專案中

```powershell
yarn add firebase
```

2. 在 main.js 中 import firebase

```javascript
import firebase from "firebase/app";
```

3. 到 firebase console 產生一個 Realtime Database, 並在左上角齒輪 -> 專案設定中取得 firebaseConfig

4.到 main.js 中加入

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDIvpdDLI8wWsT2p_2_4Orxelt2M6oBfIw",
    // authDomain: "kfctesting-43746.firebaseapp.com",
    databaseURL: "https://kfctesting-43746.firebaseio.com",
    projectId: "kfctesting-43746",
    // storageBucket: "kfctesting-43746.appspot.com",
    // messagingSenderId: "613315452358",
    // appId: "1:613315452358:web:89cbc164f80b984f5ba6c7",
};

firebase.initializeApp(firebaseConfig);
```

5. 在 App.vue 中加入

```javascript
import firebase from "firebase/app";
import firebase from "firebase/firestore";
```

# 使用範例

#### 電話認證

1. 到 firebase console 把電話認證啟用
2. 到 App.vue 中加入

```javascript
import "firebase/auth";
```

3. 在 main.js 中初始化 firebase app

```javascript
var firebaseConfig = {
                    apiKey: "AIzaSyDIvpdDLI8wWsT2p_2_4Orxelt2M6oBfIw",
                    authDomain: "kfctesting-43746.firebaseapp.com",
                    databaseURL: "https://kfctesting-43746.firebaseio.com",
                    projectId: "kfctesting-43746",
                };
firebase.initializeApp(firebaseConfig);
```

4. 在 App.vue 的 templete 加入一個元素來顯示防機器人驗證的按鈕

```html
<div id="recaptcha-container"></div>
```

5. 加入防機器人驗證

```javascript
firebase.auth().useDeviceLanguage();
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
```

6. 同時將防機器人驗證結果與電話號碼傳至 firebase auth 做驗證

```javascript
const phoneNumber = "+886937169450"; //這裡暫且寫死
const appVerifier = window.recaptchaVerifier;
firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
    })
    .catch((error) => {
        console.log(error);
    });
```

#### google認證

1. 到 firebase console把 Google 認證啟用 
2. 到 App.vue 中加入

```javascript
import "firebase/auth";
```

3. 在 main.js 中初始化 firebase app

```javascript
var firebaseConfig = {
                    apiKey: "AIzaSyDIvpdDLI8wWsT2p_2_4Orxelt2M6oBfIw",
                    authDomain: "kfctesting-43746.firebaseapp.com",
                    databaseURL: "https://kfctesting-43746.firebaseio.com",
                    projectId: "kfctesting-43746",
                };
firebase.initializeApp(firebaseConfig);
```

4. 在 App.vue 的 templete 加入一個 button 來呼叫認證

```html
<button @click="googleVerify">輸入google驗證碼</button>
```

5. 加入 google login without redirection 

```javascript
googleVerify() {
            console.log("googleSignInRedirect");
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
```

6. 在 mouted 加入

```javascript
firebase
                .auth()
                .getRedirectResult()
                .then((result) => {
                    if (result.credential) {
                        /** @type {firebase.auth.OAuthCredential} */
                        var credential = result.credential;

                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = credential.accessToken;
                        // ...
                    }
                    // The signed-in user info.
                    var user = result.user;
                    console.log(result);
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    console.log(error);
                });
```

#### 密碼認證

1. 到 firebase console把 Google 認證啟用 
2. 到 App.vue 中加入

```javascript
import "firebase/auth";
```

3. 在 main.js 中初始化 firebase app

```javascript
var firebaseConfig = {
                    apiKey: "AIzaSyDIvpdDLI8wWsT2p_2_4Orxelt2M6oBfIw",
                    authDomain: "kfctesting-43746.firebaseapp.com",
                    databaseURL: "https://kfctesting-43746.firebaseio.com",
                    projectId: "kfctesting-43746",
                };
firebase.initializeApp(firebaseConfig);
```

4. 先註冊之後就可以直接登入 在 mouted 加入

```javascript
console.log("createAccount");
            firebase
                .auth()
                .createUserWithEmailAndPassword("dashing.hank@gmail.com", "123")
                .then((user) => {
                    console.log(user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error);
                });
```

5. 登入

```javascript
signinBased() {
            console.log("signinBased");

            let email = "abc";
            let password = "123";
            firebase
                .auth()
                .signInWithEmailAndPassword("abc", "123")
                .then((user) => {
                    console.log(user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error);
                });
        },
```





