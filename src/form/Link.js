import { ExtendedNode } from "../utils";

export class Link extends ExtendedNode {
  constructor(template, pathname) {
    super(template);
    this.element.pathname = pathname;
    this.addEventListener("click", () => {
      event.preventDefault();

      window.location.href = this.element.pathname;
    });
  }
}
