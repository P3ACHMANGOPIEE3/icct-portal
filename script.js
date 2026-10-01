function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function handleLogin(event) {
  event.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errorAlert = document.getElementById('errorAlert');

  if (user !== "" && pass !== "") {
    if (errorAlert) errorAlert.style.display = "none";
    openModal('otpModal');
  } else {
    if (errorAlert) errorAlert.style.display = "flex";
  }
}

function sendResetLink() {
  const emailInput = document.getElementById('resetEmail').value.trim();
  if (emailInput !== "") {
    closeModal('forgotModal');
    openModal('emailSentModal');
  } else {
    alert("Mag-type muna ng email!");
  }
}

function verifyOTP() {
  const otpInputs = document.querySelectorAll('.otp-input');
  let enteredOTP = "";
  
  otpInputs.forEach(input => {
    enteredOTP += input.value.trim();
  });

  const otpError = document.getElementById('otpError');

  if (enteredOTP.length > 0) {
    if (otpError) otpError.style.display = "none";
    alert("✅ OTP Verified Successfully!");
    closeModal('otpModal');
  } else {
    if (otpError) otpError.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".otp-input");
  inputs.forEach((input, index) => {
    input.addEventListener("keyup", (e) => {
      if (e.target.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      if (e.key === "Backspace" && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
});