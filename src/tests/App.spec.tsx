import { mount } from '@cypress/react'
import App from '../App'

it('renders window with filter and search field', () => {
  mount(<App />)
  cy.get('p').contains('Filter your results')
  cy.get('select').contains('All books')
  cy.get('input').should('have.attr', 'placeholder', 'Start searching...')
})

it("renders an error message in case we don't get any results (assuming local API connection)", () => {
  mount(<App />)
  cy.get('input').type('!!!')
  cy.contains('No books found for: !!!.').should('be.visible')
})

it('renders search results (assuming local API connection)', () => {
  mount(<App />)
  cy.get('input').type('algernon')
  cy.contains('Daniel Keyes', { timeout: 2000 }).should('be.visible')
})

it('renders pagination options after returning results (assuming local API connection)', () => {
  mount(<App />)
  cy.get('input').type('algernon')
  cy.get('button').contains('◀').should('be.visible')
  cy.get('button').contains('▶').should('be.visible')
})
