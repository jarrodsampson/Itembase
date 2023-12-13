describe("App spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should navigate to the correct App route", () => {
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should have the correct main title", () => {
    cy.get("[data-cy=main-title]").contains("Itembase");
  });

  it("should have expected section titles", () => {
    cy.get("h2").contains("Technology Stack");
    cy.get("h2").contains("Cache and Rate Limiting");
    cy.get("h2").contains("Testing");
    cy.get("h2").contains("API Functionality");
    cy.get("h2").contains("Use Cases");
    cy.get("h2").contains("Getting Started");
    cy.get("h2").contains("Development");
    cy.get("h2").contains("License");
  });

  it("should contain only one H1 header", () => {
    cy.get("h1").should("have.length", 1);
  });

  it("should have a visible MIT License link", () => {
    cy.get("[data-cy=license-link]").should("be.visible");
  });

  it("should have 4 unordered lists and one ordered list", () => {
    cy.get("ul").should("have.length", 4);
    cy.get("ol").should("have.length", 1);
  });
});
