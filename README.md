# 專案名稱

vue-firebase-hosting

# 簡介

如何發布vue專案到hosting上

### 語言 : 

javascript

### 主旨 :

如何發布vue專案到hosting上

# 快速開始

## 環境建立

1. NodeJs

2. VS Code

3. firebase-tools

   ```powershell
   yanr add global firebase-tools
   ```

4. 建立 Firebase 專案

## 佈署

### 單專案上傳單網頁

1. firebase login 
2. firebase init 選 hosting -> public 選項輸入 dist
3. firebase deploy

### 單專案上傳複數網頁

1. firebase login 

2. firebase init 選 hosting -> public 選項輸入 dist

3. firebase hosting:sites:create <SITE_ID>

4. firebase target:apply hosting <TARGET_NAME> <SITE_ID>

5. 更改 firebase.json 的內容

   ```json
   {
     "hosting": [ {
         "target": "blog",  // "blog" is the applied TARGET_NAME for the Hosting site "myapp-blog"
         "public": "blog/dist",  // contents of this folder are deployed to the site "myapp-blog"
   
         // ...
       },
       {
         "target": "<TARGET_NAME>",  // "app" is the applied TARGET_NAME for the Hosting site "myapp-app"
         "public": "<TARGET_NAME>/dist",  // contents of this folder are deployed to the site "myapp-app"
   
         // ...
   
         "rewrites": [...]  // You can define specific Hosting configurations for each site
       }
     ]
   }
   ```

6. 到專案跟目錄下新增一個資料夾名字為 <TARGET_NAME> 將 dist 檔案複製到資料夾中

7. firebase deploy --only hosting:<TARGET_NAME>

# 觀念

1. SITE_ID 就是網站的前綴
2. TARGET_NAME 是可以隨自己想取什麼名字就可以