interface Books {
  total: number
  items: Book[]
}

interface Book {
  id: number
  volumeInfo: {
    title: string
  }
}
