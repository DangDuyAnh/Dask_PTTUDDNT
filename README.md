# Dask_PTTUDDNT

Truy cập Database:
- Truy cập địa chỉ mongodb.com
- đăng nhập (nhớ đăng nhập bằng google nhé) 
- email: nhomdask@gmail.com   /    password:dask2000
- Ấn browse collection để mở database (collection giống kiểu table trong SQL server)

Để chạy server:
- Android bắt chạy https nên để tiện thì anh em nên download https://ngrok.com/
- Download xong giải nén rồi click đúp vào là được
- Sau khi click đúp gõ: ngrok http 5000 (tại t đang để server chạy trên cổng 5000)
- Để test API trên postman thì lấy địa chỉ  http://[abcxyz].ngrok.io 
- Để test API trên android thì lấy địa chỉ  https://[abcxyz].ngrok.io 
- Chạy server bằng lệnh:
- ->cd server
- ->npm install ( để cài packet)
- ->npm start

Để chạy client:
- T chạy trên android 4 XL oke không hiểu sao chạy trên android 4 nó bị lỗi =))
- vào file Dask_PTUDDNT\client\config\Constants.js đổi lại API_URL cho phù hợp
- cd to client
- npm install (to install packets)
- (npx) react-native run-android (to open android simulator)
