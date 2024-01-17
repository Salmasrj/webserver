function togglePasswordField() {
    const buttonPsw = document.getElementById("password-toggle")
    const PasswordField = document.getElementById("password-field")
    if (PasswordField.type === "password") {
      PasswordField.type = "text";
      buttonPsw.textContent = "Hide Password";
    } else {
      PasswordField.type = "password";
      buttonPsw.textContent = "Show Password";
    }
}