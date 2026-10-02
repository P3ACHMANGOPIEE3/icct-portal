// ACTIVE USER ROLE TRACKER
let detectedRole = "student";

// OPEN & CLOSE MODAL HELPERS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    if (modalId === 'otpModal') {
      setTimeout(() => {
        const firstInput = modal.querySelector('.otp-input');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// HANDLE LOGIN SUBMISSION & DETECT USER ROLE
function handleLogin(event) {
  event.preventDefault();

  const user = document.getElementById('username').value.trim().toLowerCase();
  const pass = document.getElementById('password').value.trim().toLowerCase();
  const errorAlert = document.getElementById('errorAlert');

  if (errorAlert) errorAlert.style.display = "none";

  // 1. ADMIN CREDENTIALS
  if (user === "admin" && pass === "admin") {
    detectedRole = "admin";
    openModal('otpModal');
  } 
  // 2. PERSONNEL CREDENTIALS
  else if (user === "personnel" && pass === "personnel") {
    detectedRole = "personnel";
    openModal('otpModal');
  } 
  // 3. STUDENT CREDENTIALS
  else if ((user === "student" && pass === "student") || (user !== "" && pass !== "")) {
    detectedRole = "student";
    openModal('otpModal');
  } 
  // INVALID CREDENTIALS
  else {
    if (errorAlert) errorAlert.style.display = "flex";
  }
}

// FORGOT PASSWORD HANDLER
function sendResetLink() {
  const emailInput = document.getElementById('resetEmail').value.trim();
  if (emailInput !== "") {
    closeModal('forgotModal');
    openModal('emailSentModal');
  } else {
    alert("Please enter an email address to proceed.");
  }
}

// OTP VERIFICATION & DYNAMIC REDIRECT
function verifyOTP() {
  const otpInputs = document.querySelectorAll('.otp-input');
  let enteredOTP = "";
  
  otpInputs.forEach(input => {
    enteredOTP += input.value.trim();
  });

  const otpError = document.getElementById('otpError');

  if (enteredOTP.length > 0) {
    if (otpError) otpError.style.display = "none";
    closeModal('otpModal');

    // REDIRECT BASED ON DETECTED ROLE
    if (detectedRole === "admin") {
      window.location.href = "admin.html";
    } else if (detectedRole === "personnel") {
      window.location.href = "personnel.html";
    } else {
      window.location.href = "student.html";
    }
  } else {
    if (otpError) otpError.style.display = "flex";
  }
}

// AUTOMATIC OTP BOX JUMP & PASTE HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".otp-input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const val = e.target.value;
      if (val.length >= 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pastedData = (e.clipboardData || window.clipboardData).getData("text").trim();
      
      if (pastedData) {
        const digits = pastedData.split("");
        inputs.forEach((otpInput, i) => {
          if (digits[i]) {
            otpInput.value = digits[i];
          }
        });
        const lastIndex = Math.min(digits.length, inputs.length) - 1;
        if (lastIndex >= 0) {
          inputs[lastIndex].focus();
        }
      }
    });
  });
});