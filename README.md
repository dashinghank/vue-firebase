# 專案名稱

chatroom-demo

# 簡介

聊天室

### 語言 : 

JavaScript

### 主旨 :

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

3. 加入 firebase key

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
```

4. firebase Init

```javascript
firebase.initializeApp(firebaseConfig);
```

5. 在 App.vue 中加入

```javascript
import firebase from "firebase/app";
import "firebase/database";
```

6. 在 App.vue 中 data 內加入

```javascript
data() {
        return {
            currentAccount: "",
            userAccount: "",
            chatroomKeys: [],
            bindContent: "",
            modelContent: "",
            refChatroom: "",
            temp: "",
        };
    },
```

# 使用範例   

- 登入

- 使用者輸入帳號，查詢資料庫中的 Users/<使用者帳號> 的值一次，對 AvailableChatRooms 做foreach 把每個聊天室的 key 存在 this.chatroomKeys 裡面

```javascript
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
```

- 登出
- 清空帳號狀態

```javascript
logout() {
            console.log("logout");
            this.chatroomKeys = [];
            this.currentAccount = "";
            this.bindContent = "";
            this.refChatroom = "";
        },
```

- 註冊聊天室
- 使用 firebase 的 off 函式取消註冊該聊天室，對firebase中位置 Chatrooms/<聊天室key>/contents 註冊，當這裡面的資料有更動時，就會通知

```javascript
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
                    snapshot.forEach((d) => {
                        this.temp = this.temp + d.child("account").val() + ":" + d.child("text").val() + "\n";
                        console.log(d.child("account").val() + ":" + d.child("text").val());
                    });
                    this.bindContent = this.temp;
                    this.temp = "";
                });
        },
```

- 輸入訊息
- 用 firebase 中的 push() 把使用者輸入的訊息新增資料到指定的位置

```javascript
enterText() {
            console.log("enterText");
            var db = firebase.database();
            var time = Date.now();
            if (this.refChatroom == "" || this.modelContent == "" || this.currentAccount == "") {
                return;
            }
            db.ref("Chatrooms/" + this.refChatroom + "/contents").push({ account: this.currentAccount, text: this.modelContent, timestamp: time });
            this.modelContent = "";
        },
```