import { INVALID_CLASS } from "./constants";

export function initRegister() {
  const btn = document.getElementById("btn");
  const registerForm = document.forms["register"];

  const formHelper = {
    name: {
      value: "",
      valid: false,
      validationChecker() {
        this.name.valid = this.name.value.length !== 0;
      },
    },

    email: {
      value: "",
      valid: false,
      validationChecker() {
        const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        this.email.valid = emailRegex.test(this.email.value);
      },
    },
    repeatPassword: {
      value: "",
      valid: false,
      validationChecker() {
        this.repeatPassword.valid =
          this.repeatPassword.value === this.password.value;
      },
    },
    password: {
      value: "",
      valid: false,
      validationChecker() {
        this.password.valid = this.password.value.length !== 0;
      },
    },

    checkFormValidation() {
      for (const key in this) {
        if (typeof this[key] !== "function" && !this[key].valid) {
          return false;
        }
      }
      return true;
    },

    getData() {
      return {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      };
    },
  };

  registerForm.addEventListener("input", (event) => {
    const name = event.target.name;
    const value = event.target.value;

    formHelper[name].value = value;
    const bindedHandler = formHelper[name].validationChecker.bind(formHelper);
    bindedHandler(value);
    handleAddingValidate(event.target, formHelper[name].valid);
    handleRegisterButtonDisabledState();
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = formHelper.getData();
    console.log(data);
  });

  function handleAddingValidate(node, isValid) {
    if (!isValid && !node.classList.contains(INVALID_CLASS)) {
      node.classList.add(INVALID_CLASS);
    }

    if (isValid && node.classList.contains(INVALID_CLASS)) {
      node.classList.remove(INVALID_CLASS);
    }
  }

  function handleRegisterButtonDisabledState() {
    btn.disabled = !formHelper.checkFormValidation();
  }

  return {
    registerForm,
    handleRegisterButtonDisabledState,
  };
}
