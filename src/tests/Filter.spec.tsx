import { mount } from '@cypress/react'
import Filter from '../components/Filter'

it('renders a filter section with a label and select', () => {
  const setFilter = cy.stub().as('setFilter')
  mount(<Filter filter={'all'} setFilter={setFilter} />)
  cy.get('p').contains('Filter your results')
  cy.get('select').contains('All books')
  cy.get('select')
    .select('eBooks')
    .then(() => {
      cy.get('@setFilter').should('have.been.calledWith', 'ebooks')
      cy.contains('eBooks').should('be.visible')
    })
})
