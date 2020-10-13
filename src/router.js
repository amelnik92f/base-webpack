const { PAGE_REF } = require("./constants");
const { mountForms } = require("./form");
import { UserList } from "./users";
import users from "./data.json";

export const LOGIN_ROUTE = "/login";
export const MAIN_ROUTE = "/";
export const CLIENT_ROUTE = "/clients";
export const NOT_FOUND = "/not-found";

const routerConfig = {
  [MAIN_ROUTE]: withPageWrapper(
    withLoginProtected((user, page) => {
      page.innerHTML = "";

      const userInfoElement = document.createElement("div");
      userInfoElement.innerHTML = `<div>${user.name} пользователь в здании.</div>`;

      page.appendChild(userInfoElement);
    })
  ),

  [CLIENT_ROUTE]: withPageWrapper(
    withLoginProtected((user, page) => {
      page.innerHTML = "";
      const userList = new UserList(users);
      userList.appendMeTo(page);
    })
  ),

  [LOGIN_ROUTE]: () => {
    PAGE_REF.innerHTML = "";
    const form = mountForms();
    PAGE_REF.appendChild(form);
  },

  [NOT_FOUND]: () => {
    PAGE_REF.innerHTML = "";
    const notFound = document.createElement("div");
    notFound.innerText = `Page is not found((`;

    PAGE_REF.appendChild(notFound);
  },
};

const getTrimedRoute = (path) => {
  return path.replace(/^#/g, "");
};

const router = () => {
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

function withPageWrapper(routeFunction) {
  return (...args) => {
    let wrapper = document.getElementById("main");

    if (!wrapper) {
      PAGE_REF.innerHTML = "";
      const main = document.createElement("main");
      main.innerHTML = `<header></header><div id="main"></div>`;
      wrapper = main.querySelector("#main");
      PAGE_REF.appendChild(main);
    }

    routeFunction(wrapper, ...args);
  };
}