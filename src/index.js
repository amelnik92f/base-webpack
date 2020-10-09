const { PAGE_REF } = require("./constants");
const { mountForms } = require("./form");
import { UserList } from "./users";
import users from "./data.json";
import "./assets/styles/style.scss";

(() => {
  //   const userList = new UserList(users);
  //   userList.appendMeTo(PAGE_REF);
  const form = mountForms();
  PAGE_REF.appendChild(form);
})();
