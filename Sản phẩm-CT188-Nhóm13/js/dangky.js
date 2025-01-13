// validation form SIGNUP
const signupUsername = document.querySelector(".signup-username");
const signupEmail = document.querySelector(".signup-mail");
const signupPassword = document.querySelector(".signup-password");
const btnSignup = document.querySelector(".form-submit");

function validateEmail(signupEmail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(String(signupEmail).toLowerCase());
}

// Hiện thông báo thành công
function successMessage(elmt) {
  const formRow = elmt.parentElement;
  if (formRow.classList.contains("error")) {
    formRow.classList.remove("error");
  }
  formRow.classList.add("success");
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

// Kiểm tra tên có để trống không
function checkUsername() {
  if (signupUsername.value === "") {
    errorMessage(signupUsername, "Tên Không được để trống");
  } else {
    successMessage(signupUsername);
  }
}

// Kiểm tra email
function checkEmail() {
  if (signupEmail.value === "") {
    errorMessage(signupEmail, "Email không để trống");
  } else if (!validateEmail(signupEmail.value)) {
    errorMessage(signupEmail, "Email không hợp lệ");
  } else {
    successMessage(signupEmail);
  }
}

// Kiểm tra mật khẩu
function checkPass() {
  var pass = signupPassword.value;

  if (signupPassword.value === "") {
    errorMessage(signupPassword, "Password không để trống");
  } else if (pass.length < 8) {
    errorMessage(signupPassword, "Pass phải lớn hơn 8 kí tự");
  } else {
    successMessage(signupPassword);
  }
}

// Khi mất focus sẽ chạy chức năng
signupUsername.addEventListener("blur", checkUsername, false);
signupEmail.addEventListener("blur", checkEmail, false);
signupPassword.addEventListener("blur", checkPass, false);

// Sự kiện khi nhấn nút
btnSignup.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    signupUsername.value === "" ||
    signupEmail.value === "" ||
    signupPassword.value === "" ||
    !validateEmail(signupEmail.value)
  ) {
    checkUsername();
    checkEmail();
    checkPass();
  } else {
    const user = {
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    let json = JSON.stringify(user);
    localStorage.setItem(signupEmail.value, json);
    alert("Đăng ký thành công.");
    window.location.href = "dangnhap.html";
  }
});
