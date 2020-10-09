const { PAGE_REF } = require("./constants");
const { mountForms } = require("./form");
import { UserList } from "./users";
import users from "./data.json";

const LOGIN_ROUTE = "/";
const MAIN_ROUTE = "/main";

const routerConfig = {
  [MAIN_ROUTE]: () => {
    // protectRoute(true);
    const userList = new UserList(users);
    userList.appendMeTo(PAGE_REF);
  },
  [LOGIN_ROUTE]: () => {
    const form = mountForms();
    PAGE_REF.appendChild(form);
  },
};

const router = () => {
  const trimmed = getTrimedRoute(window.location.hash);
  console.log(trimmed);
  if (routerConfig[trimmed]) {
    routerConfig[trimmed]();
  } else {
    routerConfig[LOGIN_ROUTE];
  }
};

export const initRouter = () => {
  window.addEventListener("hashchange", (ev) => {
    PAGE_REF.innerHTML = "";
    router();
  });

  if (!window.location.hash) {
    window.location.hash = LOGIN_ROUTE;
  } else {
    router();
  }
};

const getTrimedRoute = (path) => {
  return path.replace(/^#/g, "");
};

export const protectRoute = (isForbidden) => {
  if (isForbidden) {
    window.location.hash = LOGIN_ROUTE;
  }
};
