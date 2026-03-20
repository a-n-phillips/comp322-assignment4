// validation.js - COMP 322 Assignment 4

document.getElementById("submit-btn").addEventListener("click", validateForm);

document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("error-section").innerHTML = "";
});

function validateForm() {
  const errorSection = document.getElementById("error-section");
  errorSection.innerHTML = "";

  const username      = document.getElementById("username").value.trim();
  const email         = document.getElementById("email").value.trim();
  const phone         = document.getElementById("phone").value.trim();
  const password      = document.getElementById("password").value;
  const confirmPwd    = document.getElementById("confirm-password").value;
  const ageGroup      = document.getElementById("age-group").value;
  const genderRadios  = document.querySelectorAll('input[name="gender"]');

  let genderSelected = false;
  for (let radio of genderRadios) {
    if (radio.checked) { genderSelected = true; break; }
  }

  // --- Regex patterns ---
  const usernameRegex = /^[a-z0-9]{4,12}$/;
  const emailRegex    = /^[^\s@]+@[^\s@]+\.(net|com|org|edu)$/;
  const phoneRegex    = /^\(\d{3}\)-\d{3}-\d{4}$/;
  // Password: lowercase, uppercase, digits, underscores, special chars; min 9 chars
  // Must have at least 1 uppercase, 1 lowercase, 1 digit, 1 special character
  const passwordRegex       = /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]{9,}$/;
  const hasUppercase        = /[A-Z]/;
  const hasLowercase        = /[a-z]/;
  const hasNumber           = /[0-9]/;
  const hasSpecial          = /[^a-zA-Z0-9_]/;  // anything that isn't letter/digit/underscore

  let errors = [];

  // ---- Empty field checks (red) ----
  if (username === "") {
    errors.push({ msg: "Please Enter <strong>Username</strong>", color: "red" });
  } else if (!usernameRegex.test(username)) {
    errors.push({ msg: "Please Enter a <strong style='color:orange'>valid username</strong>", color: "black" });
  }

  if (email === "") {
    errors.push({ msg: "Please Enter <strong>Email</strong>", color: "red" });
  } else if (!emailRegex.test(email)) {
    errors.push({ msg: "Please Enter a <strong style='color:orange'>valid email</strong>", color: "black" });
  }

  if (phone === "") {
    errors.push({ msg: "Please Enter <strong>Phone Number</strong>", color: "red" });
  } else if (!phoneRegex.test(phone)) {
    errors.push({ msg: "Please Enter a <strong style='color:orange'>valid phone number</strong>", color: "black" });
  }

  if (password === "") {
    errors.push({ msg: "Please Enter <strong>Password</strong>", color: "red" });
  } else if (
    !passwordRegex.test(password) ||
    !hasUppercase.test(password) ||
    !hasLowercase.test(password) ||
    !hasNumber.test(password) ||
    !hasSpecial.test(password)
  ) {
    errors.push({ msg: "Please Enter a <strong style='color:orange'>valid password</strong>", color: "black" });
  }

  if (!genderSelected) {
    errors.push({ msg: "Please Select <strong>Gender</strong>", color: "red" });
  }

  if (ageGroup === "") {
    errors.push({ msg: "Please Select <strong>Age Group</strong>", color: "red" });
  }

  // ---- Display errors ----
  if (errors.length > 0) {
    errors.forEach(function (err) {
      const p = document.createElement("p");
      p.innerHTML = err.msg;
      p.style.color = err.color;
      errorSection.appendChild(p);
    });
    return;
  }

  // ---- Password match check ----
  if (password !== confirmPwd) {
    alert("passwords do not match");
    return;
  }

  // ---- All valid: redirect ----
  window.location.href = "http://your-vm-address/index.html"; // replace with your VM URL
}
