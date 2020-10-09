import { INVALID_CLASS, PAGE_REF, BASE_USERS } from "../../constants";
import { ExtendedNode } from "../../utils";
import { loginTemplate } from "./template";

export function mountLogin() {
  const loginForm = ExtendedNode.createFromTemplate(loginTemplate);
  const loginEmail = loginForm.querySelector("#loginEmailInput");
  const loginPassword = loginForm.querySelector("#loginPasswordInput");
  const loginBtn = loginForm.querySelector("#loginBtn");

  let message = null;

  loginEmail.addEventListener("input", eventHandler);
  loginPassword.addEventListener("input", eventHandler);
  loginBtn.addEventListener("click", onClick);
  setDisabledButtonState();

  function eventHandler(event) {
    const hasInvalidClass = event.target.classList.contains(INVALID_CLASS);
    const isValid = event.target.value !== "";

    if (!hasInvalidClass && !isValid) {
      event.target.classList.add(INVALID_CLASS);
    }

    if (hasInvalidClass && isValid) {
      event.target.classList.remove(INVALID_CLASS);
    }

    if (message) {
      PAGE_REF.classList.remove(INVALID_CLASS);
      message.remove();
      message = null;
    }

    setDisabledButtonState();
  }

  function onClick(event) {
    event.preventDefault();
    message = document.createElement("div");
    message.classList.add("message");
    const user = BASE_USERS.find(({ email }) => email === loginEmail.value);
    if (
      user &&
      loginEmail.value === user.email &&
      loginPassword.value === user.password
    ) {
      message.innerText = `Hello, ${user.name}!`;
    } else {
      message.innerText = user
        ? "Вы ввели неверный пароль. Попробуйте снова."
        : "Пользователь с указанным email не найден";
      PAGE_REF.classList.add(INVALID_CLASS);
      loginForm.reset();
      setDisabledButtonState();
    }

    PAGE_REF.append(message);
  }

  function setDisabledButtonState() {
    loginBtn.disabled = !loginEmail.value || !loginPassword.value;
  }

  return loginForm;
}
