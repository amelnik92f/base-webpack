import { initLogin } from "./login";
import { initRegister } from "./register";

import "./assets/styles/style.scss";

const { loginForm, setDisabledButtonState } = initLogin();
const { registerForm, handleRegisterButtonDisabledState } = initRegister();

const setLoginBtn = document.getElementById("setLoginBtn");
const setRegisterBtn = document.getElementById("setRegisterBtn");

setLoginBtn.addEventListener("click", setLoginFormActive);
setRegisterBtn.addEventListener("click", setRegisterFormActive);

setLoginFormActive();

function setLoginFormActive() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  setLoginBtn.classList.add("active-btn");
  setRegisterBtn.classList.remove("active-btn");
  setDisabledButtonState();
}

function setRegisterFormActive() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  setLoginBtn.classList.remove("active-btn");
  setRegisterBtn.classList.add("active-btn");
  handleRegisterButtonDisabledState();
}
