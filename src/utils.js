const parser = new DOMParser();

export const createFromTemplate = (template) => {
  return ExtendedNode.createFromTemplate(template);
};

export class ExtendedNode {
  constructor(template) {
    this.template = template;
    this.element = this.constructor.createFromTemplate(template);
  }

  static createFromTemplate(template) {
    const { body } = parser.parseFromString(template, "text/html");
    return body.firstChild;
  }

  adjustClasslist(...classes) {
    this.element.classList.add(...classes);
  }

  addEventListener(event, cb, ...params) {
    this.element.addEventListener(event, cb, ...params);
  }

  appendMeTo(to = document.body) {
    to.append(this.element);
  }

  appendIntoMe(...elements) {
    this.element.append(...elements);
  }

  changeText(text) {
    this.element.innerText = text;
  }

  deleteMe() {
    this.element.remove();
  }

}
