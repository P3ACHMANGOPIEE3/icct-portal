// OPEN AND CLOSE MODALS
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// HANDLE LOGIN SUBMISSION
function handleLogin(event) {
  event.preventDefault(); // Iwas page refresh

  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // KAPAG NAG-INPUT NG KAHIT ANO, IPAPASOK SA OTP VERIFICATION MODAL
  if (user !== "" && pass !== "") {
    document.getElementById('errorAlert').style.display = "none";
    openModal('otpModal');
  } else {
    document.getElementById('errorAlert').style.display = "flex";
  }
}

// SEND RESET LINK LOGIC
function sendResetLink() {
  closeModal('forgotModal');
  openModal('emailSentModal');
}

// VERIFY OTP LOGIC
function verifyOTP() {
  // SA SUCCESSFUL OTP, DIDERETSO SA DASHBOARD SCREEN
  alert("OTP Verified Successfully! Redirecting to Dashboard...");
  closeModal('otpModal');
}