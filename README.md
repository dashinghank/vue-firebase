# 專案名稱

Firebase Firestore in Vue

# 簡介

如何在 Vue 專案中使用 Firebase 的 Firestore

### 語言 :

JavaScript

### 主旨 :

1. 在專案內加入 firebase
2. import firebase
3. Firestore CRUD

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

資料結構範例:

```json
{
    "Users": {
        "User001": {
            "isHide": true,
            "registeredTime": ""
        },
        "User002": {
            "isHide": false,
            "registeredTime": ""
        },
        "User003": {
            "isHide": false,
            "registeredTime": ""
        }
    }
}
```

## Create (建立資料):

### 寫單筆 Document

直接改寫整個 Document

```javascript
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
```

增加一筆 Document, 類似 RTDB 的 Push

```javascript
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
```

## Read (讀取資料):

### 讀取資料分成兩種方式

-   單次取出
-   監聽資料變更事件

#### 單次取出

-   Collections 取得集合

```javascript
db.collection("Users")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id);
            console.log(doc.data());
        });
    });
```

-   Doc 單筆 Document

```javascript
db.collection("Users")
    .doc("User001")
    .get()
    .then((doc) => {
        console.log(doc.id);
        console.log(doc.data());
    });
```

-   Doc 多筆 Document (設定 Query 條件)

```javascript
db.collection("Users")
    .where("isHide", "==", false)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
        });
    });
```

#### 註冊變更

-   Collections 註冊集合

```javascript
db.collection("Users").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
    });
});
```

-   Doc 註冊單筆 Document

```javascript
db.collection("Users")
    .doc("User001")
    .onSnapshot((doc) => {
        console.log(doc.id);
        console.log(doc.data());
    });
```

-   Doc 註冊多筆 Document (設定 Query 條件)

```javascript
db.collection("Users")
    .where("isHide", "==", false)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
        });
    });
```

## Update (更新資料):

## Remove (移除資料):

# 觀念

## Firestore 的資料類型分成兩種

-   Collections : 就是 Hashmap, Collections 中可存放 Collections 與 Doc
-   Doc : 就是單筆資料內容
