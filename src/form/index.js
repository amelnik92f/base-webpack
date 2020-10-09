import { ExtendedNode } from "../utils";
import { mountLogin } from "./login/login";
import { mountRegister } from "./register/register";
import { formTemplate } from "./template";

export const mountForms = () => {
  const form = ExtendedNode.createFromTemplate(formTemplate);
  const loginForm = mountLogin();
  const registerForm = mountRegister();

  form.append(loginForm, registerForm);

  const setLoginBtn = form.querySelector("#setLoginBtn");
  const setRegisterBtn = form.querySelector("#setRegisterBtn");

  setLoginBtn.addEventListener("click", setLoginFormActive);
  setRegisterBtn.addEventListener("click", setRegisterFormActive);

  setLoginFormActive();

  function setLoginFormActive() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    setLoginBtn.classList.add("active-btn");
    setRegisterBtn.classList.remove("active-btn");
  }

  function setRegisterFormActive() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    setLoginBtn.classList.remove("active-btn");
    setRegisterBtn.classList.add("active-btn");
  }

  return form;
};
