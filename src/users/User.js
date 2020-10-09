const { ExtendedNode } = require("../utils");

const userTemplate = `
<li class="user"></li>
`;

const userDataTemplate = (text) => `
<span class="user-info">${text}</span>
`;

const userDataButton = `
<button class="user-action">Delete</button>
`;

export class User extends ExtendedNode {
  constructor(user, onDelete) {
    super(userTemplate);
    this.user = user;
    this.onDelete = onDelete;
    this.insertData();
    this.insertButton();
    this.handleIsActive();
  }

  insertData() {
    const { name, company, email, phone, balance, gender } = this.user;

    const userDataElements = [name, company, email, phone, balance, gender].map(
      (text) => {
        const template = userDataTemplate(text);
        const wrapper = new ExtendedNode(template);

        return wrapper.element;
      }
    );

    this.appendIntoMe(...userDataElements);
  }

  insertButton() {
    const userButton = new ExtendedNode(userDataButton);

    userButton.addEventListener("click", () => {
      this.deleteMe();
      if (this.onDelete) {
        this.onDelete();
      }
    });
    
    this.appendIntoMe(userButton.element);
  }

  handleIsActive() {
    if (this.user.isActive) {
      this.adjustClasslist("active");
    }
  }
}
