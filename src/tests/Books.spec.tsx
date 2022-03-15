import { mount } from '@cypress/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Books from '../components/Books'

const queryClient = new QueryClient()

it("renders an informative message if there's no search yet", () => {
  mount(
    <QueryClientProvider client={queryClient}>
      <Books />
    </QueryClientProvider>
  )
  cy.get('p').contains('Search for books by using the field above.')
})

it('renders a no results found message if no results found but valid search (assuming local API connection)', () => {
  mount(
    <QueryClientProvider client={queryClient}>
      <Books search={'!!!'} />
    </QueryClientProvider>
  )
  cy.get('p').contains('No books found for: !!!.')
})

it('renders results (assuming local API connection)', () => {
  mount(
    <QueryClientProvider client={queryClient}>
      <Books search={'algernon'} />
    </QueryClientProvider>
  )
  cy.contains('Daniel Keyes', { timeout: 2000 }).should('be.visible')
})
