// OPEN AND CLOSE MODAL HELPERS
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// LOGIN SUBMISSION
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

// OTP VERIFICATION
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
    window.location.href = "student.html";
  } else {
    if (otpError) otpError.style.display = "flex";
  }
}

// REDIRECT TO PAYMENT PAGE
function goToPayFees() {
  window.location.href = "pay-fees.html";
}

// RECEIPT FILE PREVIEW FUNCTIONALITY
function previewReceiptFile(event) {
  const file = event.target.files[0];
  const placeholder = document.getElementById('uploadPlaceholder');
  const preview = document.getElementById('uploadPreview');
  const fileNameText = document.getElementById('fileNameText');

  if (file) {
    placeholder.style.display = "none";
    preview.style.display = "block";
    fileNameText.textContent = file.name;
  }
}

// PAYMENT SUBMISSION HANDLER WITH LOCALSTORAGE FOR PERSONNEL VERIFICATION
function handlePaymentSubmit(event) {
  event.preventDefault();
  
  const selectElem = document.getElementById('feeType');
  const feeAmount = selectElem.value;
  const selectedOption = selectElem.options[selectElem.selectedIndex];
  const feeName = selectedOption.getAttribute('data-name') || "Department Dues";
  
  const refNumber = document.getElementById('refNumber').value.trim();
  const receiptFileInput = document.getElementById('receiptFile');

  if (!feeAmount) {
    alert("Please select a fee type.");
    return;
  }

  if (refNumber === "") {
    alert("Please enter a valid reference number.");
    return;
  }

  if (receiptFileInput.files.length === 0) {
    alert("Please upload your proof of payment receipt image.");
    return;
  }

  const uploadedFileName = receiptFileInput.files[0].name;

  // SAVE PAYMENT TO LOCALSTORAGE SO PERSONNEL CAN READ IT LATER
  const paymentData = {
    feeName: feeName,
    amount: feeAmount,
    refNumber: refNumber,
    fileName: uploadedFileName,
    status: "Pending",
    date: new Date().toLocaleDateString()
  };

  localStorage.setItem("latestPayment", JSON.stringify(paymentData));

  // REDIRECT TO ENHANCED CONFIRMATION PAGE
  window.location.href = "payment-success.html";
}