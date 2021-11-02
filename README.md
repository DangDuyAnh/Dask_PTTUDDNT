# Dask_PTTUDDNT

Truy cập Database:
- Truy cập địa chỉ mongodb.com
- đăng nhập (nhớ đăng nhập bằng google nhé) 
- email: nhomdask@gmail.com   /    password:dask2000
- Ấn browse collection để mở database (collection giống kiểu table trong SQL server)

Để chạy server:
- vào file .env sửa HOST thành địa chỉ IP LAN
- Chạy server bằng lệnh:
- ->cd server
- ->npm install ( để cài packet)
- ->npm start

Để chạy client:
- T chạy trên android 4 XL oke không hiểu sao chạy trên android 4 nó bị lỗi =))
- vào file Dask_PTUDDNT\client\config\Constants.js đổi lại API_URL thành địa chỉ HOST:port (VD http://192.168.1.21:5000) tại server t đang để chạy trên cổng 5000
- cd to client
- npm install (to install packets)
- (npx) react-native run-android (to open android simulator)
