# 專案名稱

Firebase Firestore in Vue

# 簡介

Cloud Storage CRUD

### 語言 :

JavaScript

### 主旨 :

1. put
2. getDownloadURL
3. delete

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
import "firebase/storage";
```

6. 在 Terminal 輸入

```javascript
yarn add vue-file-agent --save
```

7. 在 App.vue 中加入

```javascript
import Vue from "vue";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
Vue.use(VueFileAgent);
```

8. 在 App.vue 中的 export default 中的 data 加入 ```fileRecords: [],```
9. 在 App.vue 中的 template 加入

```html
<VueFileAgent v-model="fileRecords"></VueFileAgent>
<button @click="put">上傳</button>
<button @click="download">下載</button>
<button @click="delete">刪除</button>
<img id="myimg"/>
```

# 使用範例

#### Upload

##### 上傳有分兩種

- 直接上傳雲端中沒有同檔名的檔案
- 上傳重複檔名會直接覆蓋掉舊的

##### 上傳檔案到 cloud storage

1. 在 methods 中加入 put()

```javascript
put() {
            var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child("imagestest/testing");
            mountainImagesRef
                .put(this.fileRecords[0].file)
                .then((result) => {
                    console.log("成功");
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
}
```

2. 在網頁上上傳檔案按下<上傳>按鈕

#### Download

1. 在 methods 中加入 download()

```javascript
var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child("imagestest/testing");
            mountainImagesRef
                .getDownloadURL()
                .then(function(url) {
                    console.log("成功");
                    console.log(url);

                   var link = document.createElement("a");
                    link.href = url;
                    // link.download = "";
                    link.click();

                    var img = document.getElementById("myimg");
                    img.src = url;
                })
                .catch(function(error) {
                    console.log(error);
                });
```

2. 在網頁上按下<下載>按鈕

#### Delete

1. 在 methods 中加入 delete()

```javascript
var desertRef = storageRef.child("imagestest/testing");
            // Delete the file
            desertRef
                .delete()
                .then(function() {
                    console.log("success");
                    // File deleted successfully
                })
                .catch(function(error) {
                    console.log(error);
                    // Uh-oh, an error occurred!
                });
```

2. 在網頁上按下<刪除>按鈕

# 觀念

- put 中的上傳位置如果沒有 imagetest 會自動幫你創然後會把你上傳的檔案命名為 testing
- "imagestest/testing" 中的 testing 指得是你上傳的檔案的命名，舉例來說，你上傳一個叫"abc"的jpg檔案，在 cloud storage 中會叫做 "testing"

