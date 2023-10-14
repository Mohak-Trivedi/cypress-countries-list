declare namespace Cypress {
  interface Chainable<Subject> {
    isVisible(): Chainable<JQuery<HTMLElement>>;
  }
}
