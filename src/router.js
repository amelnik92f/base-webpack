const { PAGE_REF } = require("./constants");
const { mountForms } = require("./form");
import { UserList } from "./users";
import users from "./data.json";

export const LOGIN_ROUTE = "/login";
export const MAIN_ROUTE = "/";
export const CLIENT_ROUTE = "/clients";
export const NOT_FOUND = "/not-found";

const routerConfig = {
  [MAIN_ROUTE]: withLoginProtected((user) => {
    const userInfoElement = document.createElement("div");
    userInfoElement.innerHTML = `<div>${user.name} пользователь в здании.</div>`;

    PAGE_REF.appendChild(userInfoElement);
  }),

  [CLIENT_ROUTE]: withLoginProtected(() => {
    const userList = new UserList(users);
    userList.appendMeTo(PAGE_REF);
  }),

  [LOGIN_ROUTE]: () => {
    const form = mountForms();
    PAGE_REF.appendChild(form);
  },

  [NOT_FOUND]: () => {
    const notFound = document.createElement("div");
    notFound.innerText = `Page is not found((`;

    PAGE_REF.appendChild(notFound);
  },
};

const getTrimedRoute = (path) => {
  return path.replace(/^#/g, "");
};

const router = () => {
  PAGE_REF.innerHTML = "";
  const trimmed = window.location.hash
    ? getTrimedRoute(window.location.hash)
    : MAIN_ROUTE;
  if (routerConfig[trimmed]) {
    routerConfig[trimmed]();
  } else {
    window.location.hash = NOT_FOUND;
  }
};

export const initRouter = () => {
  window.addEventListener("hashchange", router);
  router();
};

function withLoginProtected(routeFunction) {
  return (...args) => {
    const userData = { name: "Alex" };
    // select from storage
    if (userData) {
      routeFunction(userData, ...args);
    } else {
      window.location.hash = LOGIN_ROUTE;
    }
  };
}
