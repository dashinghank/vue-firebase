# 專案名稱

Firebase RTDB in Vue

# 簡介

如何在 Vue 專案中使用 Firebase 的 realtime database

### 語言 :

JavaScript

### 主旨 :

1. 在專案內加入 firebase
2. import firebase
3. firebase CRUD

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
```

# 使用範例

## Create (建立資料):

### Set:

對整個根目錄下的資料進行"取代"賦值

```javascript
var db = firebase.database();
db.ref().set({
    myAccount: {
        name: "hank",
        age: "24",
    },
});
```

```bash
myAccount:{
		name:"Jack",
		age:"20"
}
///重設後
myAccount:{
        name:"Hank",
        age:"24"
    }
```

### Push:

在根目錄下新增一筆新資料

```javascript
var db = firebase.database();
db.ref().push({
    myAccount: {
        name: "jack",
        age: "20",
    },
});
```

```bash
//push前
myAccount: {
                name: "hank",
                age: "24",
            },
//push後
jhkNLK234lkd2+:{
	myAccount: {
        name: "jack",
        age: "20"
    }
},
AWJEKLQWH3212-:{
    myAccount: {
        name: "hank",
        age: "24"
    }
}

```

## READ (讀取資料):

##### once 為單次讀取

-   讀取單筆資料:

```javascript
db.ref().once("value", (snapshot) => {
    console.log(snapshot.val());
});
```

-   循序讀取資料(foreach):

```javascript
db.ref().once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.key());
        console.log(childSnapshot.val());
    });
});
```

#### on:

##### on 為當每次 snapshot 中的值有變動時就會取值

```javascript
db.ref().once("value", (snapshot) => {
    console.log(childSnapshot.val());
});
```

-   on 也分成單次和循序讀取兩種

#### Update (更新資料):

```javascript
var db = firebase.database();
db.ref().child("myAccount").update({
    height: "173",
});
```

```bash
//更新前
myAccount:{
		name:"hank",
		age:"24",
}
//更新後
myAccount:{
		name:"hank",
		age:"24",
		height:"173"
}
```

#### Remove (移除資料):

```javascript
var db = firebase.database();
db.ref().child("myAccount/height").remove();
```

# 觀念

-   ref 為指標可以想成現在指著資料的哪裡，ref()為根目錄

-   child 為向下搜尋 "key"

-   set 會把整個資料重新設定為你指定的資料
# 流程圖
![flowchart](https://user-images.githubusercontent.com/70556966/105006024-0b296a80-5a71-11eb-84f4-75cbc1f18235.png)
