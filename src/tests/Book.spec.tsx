import { mount } from '@cypress/react'
import Book from '../components/Book'

it('renders a book with all of its information', () => {
  const book: Book = {
    id: '1',
    volumeInfo: {
      title: 'Test book',
      authors: ['Test author 1', 'Test author 2'],
      categories: ['Test category 1', 'Test category 2'],
      pageCount: 1337,
      publishedDate: '2022',
      publisher: 'Test publisher',
      description: 'Test description...',
      averageRating: 3.5,
      imageLinks: {
        smallThumbnail:
          'https://avatars.githubusercontent.com/u/14320932?s=48&v=4'
      },
      previewLink: 'https://github.com/nunogois/booksearch-react-vite'
    }
  }
  mount(<Book {...book} />)
  cy.contains('Test book')
  cy.contains('Test author 1, Test author 2')
  cy.contains('Test category 1, Test category 2')
  cy.contains('⭐⭐⭐ (3.5)')
  cy.contains('1337 pages • 2022 • Test publisher')
  cy.contains('Test description...')
  cy.get('a').should(
    'have.attr',
    'href',
    'https://github.com/nunogois/booksearch-react-vite'
  )
  cy.get('img').should(
    'have.attr',
    'src',
    'https://avatars.githubusercontent.com/u/14320932?s=48&v=4'
  )
})
