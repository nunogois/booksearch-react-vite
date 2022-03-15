interface Books {
  total: number
  items: Book[]
}

interface Book {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    categories: string[]
    pageCount: number
    publishedDate: string
    publisher: string
    description: string
    averageRating: number
    imageLinks: {
      smallThumbnail: string
    }
    previewLink: string
  }
}
