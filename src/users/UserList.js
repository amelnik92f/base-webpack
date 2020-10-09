import { ExtendedNode } from "../utils";
import { User } from "./User";

const userListTemplateWrapper = `
<div class="user-list-wrapper"></div>
`;

const userListCalculatedInfo = (text) => `
<div class="user-list-counted">${text}</div>
`;

const userListTemplate = `
<ul class="user-list"></ul>
`;

export class UserList extends ExtendedNode {
  constructor(users) {
    super(userListTemplateWrapper);
    this.users = users;

    const userDomNodes = this.createListItems();

    const list = new ExtendedNode(userListTemplate);

    this.genderInfoNode = new ExtendedNode(
      userListCalculatedInfo(this.generateMaleText())
    );

    this.maxBalanceInfoNode = new ExtendedNode(
      userListCalculatedInfo(this.generateMaxBalanceText())
    );

    list.appendIntoMe(...userDomNodes);

    this.appendIntoMe(
      this.genderInfoNode.element,
      this.maxBalanceInfoNode.element,
      list.element
    );
  }

  createListItems() {
    return this.users.map((user) => {
      const onDelete = () => {
        const indexToDelete = this.users.findIndex(
          (userToFind) => userToFind.email === user.email
        );

        this.users.splice(indexToDelete, 1);

        this.genderInfoNode.changeText(this.generateMaleText());
        this.maxBalanceInfoNode.changeText(this.generateMaxBalanceText());
      };

      const { element } = new User(user, onDelete);

      return element;
    });
  }

  generateMaleText() {
    const { male, female } = this.calculateGenderCount();

    return `Male count: ${male}, Female count: ${female}`;
  }

  generateMaxBalanceText() {
    return `Max balance is ${this.calculateMaxBalance()}`;
  }

  calculateMaxBalance() {
    let maxBalance = 0;

    for (const { balance } of this.users) {
      const convertedBalance = Number(balance.replace(/\$|\,/g, ""));

      if (convertedBalance > maxBalance) {
        maxBalance = convertedBalance;
      }
    }

    return maxBalance;
  }

  calculateGenderCount() {
    const genderCount = {
      male: 0,
      female: 0,
    };

    for (const { gender } of this.users) {
      genderCount[gender]++;
    }

    return genderCount;
  }
}
