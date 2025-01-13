// Lấy giá trị userAuthenticated từ local storage
const userAuthenticated = localStorage.getItem("userAuthenticated");
const btnLogout = document.getElementById("btnLogout");
const btnLogin = document.getElementById("btnLogin");
const userl = document.getElementById("userL");

// Lấy thông tin người dùng từ local storage
// Lấy tên Email đã lưu trong local storage
const Email = localStorage.getItem("Email");
// Tìm thông tin user thông qua Email
const userData = JSON.parse(localStorage.getItem(Email));

// Kiểm tra xem người dùng đã đăng nhập hay chưa
if (userAuthenticated === "true") {
  // Nếu userAuthenticated là "true", tức là người dùng đã đăng nhập thành công
  // Hiện nút "Thoát" bằng cách thay đổi thuộc tính CSS của nút này
  btnLogout.style.display = "inline";
  userl.style.display = "inline";
  btnLogin.style.display = "none";
  userl.textContent = userData.username;
}

btnLogout.addEventListener("click", () => {
  // Cập nhật giá trị userAuthenticated trong local storage thành false khi người dùng nhấn "Thoát"
  localStorage.setItem("userAuthenticated", "false");
});
