describe("App spec", () => {
  it("App Route Passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h2").contains("Docs");
    cy.get("h2").contains("Learn");
    cy.get("h2").contains("Templates");
    cy.get("h2").contains("Deploy");
  });
});
