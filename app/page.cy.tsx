import React from "react";
import Home from "./page";

describe("<Home />", () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });

  it("renders title", () => {
    cy.contains("Itembase").should("be.visible");
  });

  it("renders sections", () => {
    cy.get("h2").should("have.length", 8);
  });

  it("renders license link", () => {
    cy.get("[data-cy=license-link]").should("be.visible");
  });
});
