/// <reference types= "Cypress"/>
//PARA QUE FUNCIONEN LOS COMANDDOS DE AYUDA DE CYPRESS


//EJEMPLO DE COMO ABRIR UNA PAGINA WEB
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.wait(4000) //Tiempo de espera
  })
})

//EJEMPLO DE PRUEBA POSITIVA
describe('My First Test success', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
    cy.wait(4000) //Tiempo de espera
  })
})

//EJEMPLO DE PRUEBA NEGATIVA
describe('My First Test fail', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
    cy.wait(4000) //Tiempo de espera
  })
})