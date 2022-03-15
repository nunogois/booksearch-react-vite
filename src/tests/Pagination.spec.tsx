import { mount } from '@cypress/react'
import Pagination from '../components/Pagination'

it('renders a pagination control with buttons for prev, next, and all the page numbers', () => {
  const setPage = cy.stub().as('setPage')
  mount(<Pagination page={1} setPage={setPage} total={10} />)
  cy.get('button').contains('◀').should('be.visible')
  cy.get('button').contains('▶').should('be.visible')
  for (let i = 1; i <= 10; i++)
    cy.get('button').contains(i).should('be.visible')
})

it('should change page using the buttons', () => {
  const setPage = cy.stub().as('setPage')
  mount(<Pagination page={5} setPage={setPage} total={10} />)
  cy.get('button')
    .contains('▶')
    .click()
    .then(() => {
      cy.get('@setPage').should('have.been.calledWith', 6)
    })

  cy.get('button')
    .contains('◀')
    .click()
    .then(() => {
      cy.get('@setPage').should('have.been.calledWith', 4)
    })

  for (let i = 1; i <= 10; i++) {
    cy.get('button')
      .contains(i)
      .click()
      .then(() => {
        cy.get('@setPage').should('have.been.calledWith', i)
      })
  }
})

it('should not allow changing the page to the prev when on the first one, or next when on the last one', () => {
  const setPage = cy.stub()
  mount(<Pagination page={1} setPage={setPage} total={10} />)
  cy.get('button').contains('◀').should('be.disabled')
  cy.get('button').contains('▶').should('not.be.disabled')

  mount(<Pagination page={10} setPage={setPage} total={10} />)
  cy.get('button').contains('◀').should('not.be.disabled')
  cy.get('button').contains('▶').should('be.disabled')
})
