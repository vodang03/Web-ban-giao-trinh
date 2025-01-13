const loginEmail = document.querySelector(".login-mail");
const loginPassword = document.querySelector(".login-password");
const btnLogin = document.querySelector(".form-submit");

// Xoá thông báo lỗi
function successMessage(elmt) {
  const formRow = elmt.parentElement;
  if (formRow.classList.contains("error")) {
    formRow.classList.remove("error");
  }
}

// HIện thông báo lỗi
function errorMessage(elmt, message) {
  const formRow = elmt.parentElement;
  if (formRow.classList.contains("success")) {
    formRow.classList.remove("success");
  }
  formRow.classList.add("error");
  formRow.querySelector(".message").textContent = message;
}

// Kiểm tra email
function checkEmail() {
  if (loginEmail.value === "") {
    errorMessage(loginEmail, "Email không để trống");
  } else {
    successMessage(loginEmail);
  }
}

// Kiểm tra mật khẩu
function checkPass() {
  var pass = loginPassword.value;

  if (loginPassword.value === "") {
    errorMessage(loginPassword, "Password không để trống");
  } else {
    successMessage(loginPassword);
  }
}

// Khi mất focus sẽ chạy chức năng
loginEmail.addEventListener("blur", checkEmail, false);
loginPassword.addEventListener("blur", checkPass, false);

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginEmail.value === "" || loginPassword.value === "") {
    checkEmail();
    checkPass();
  } else {
    const user = JSON.parse(localStorage.getItem(loginEmail.value));
    if (user && user.password === loginPassword.value) {
      alert("Đăng nhập thành công.");

      // Gán biến userAuthenticated = true để xác định đăng nhập thành công
      const userAuthenticated = true;
      localStorage.setItem("userAuthenticated", userAuthenticated);
      // Lưu biến Email với email đã đăng nhập thành công
      localStorage.setItem("Email", user.email);

      window.location.href = "trangchu.html";
    } else {
      alert("Đăng nhập thất bại.");
    }
  }
});
