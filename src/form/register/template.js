export const registerTemplate = `
<form id="registerForm" novalidate name="register">
          <input
            type="text"
            name="name"
            placeholder="Login"
            id="loginInput"
            autofocus
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="emailInput"
            autofocus
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            id="passwordInput"
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            id="passwordInputRepeat"
          />
          <button disabled id="registerBtn" class="form-button">Submit</button>
        </form>
`;
