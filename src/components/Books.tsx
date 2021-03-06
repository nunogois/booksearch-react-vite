import { useState } from 'react'
import { useQuery } from 'react-query'

import Pagination from './Pagination'
import Book from './Book'

async function fetchBooks(
  search: string,
  page: number = 1,
  filter: string = 'all'
) {
  const res = await fetch(
    `${
      import.meta.env.VITE_API ?? 'http://localhost:5001'
    }/books?search=${encodeURIComponent(search)}&page=${page}&filter=${filter}`
  )
  return res.json()
}

interface BooksProps {
  search?: string
  filter?: string
}

function Books({ search = '', filter = '' }: BooksProps) {
  const [page, setPage] = useState(1)

  const { data, status, error, isFetching } = useQuery(
    ['books', { search, page, filter }],
    () => fetchBooks(search, page, filter),
    {
      keepPreviousData: true,
      enabled: search.length >= 3,
      refetchOnWindowFocus: false
    }
  )

  if (status === 'loading' || isFetching) {
    return (
      <div className='flex items-center justify-center p-2'>
        <p>Loading...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className='flex items-center justify-center p-2'>
        <p>Error: {(error as { message: string }).message}</p>
      </div>
    )
  }

  if (!data?.items || data?.items?.length === 0) {
    if (search.length === 0) {
      return (
        <div className='flex items-center justify-center p-2'>
          <p>Search for books by using the field above.</p>
        </div>
      )
    } else {
      return (
        <div className='flex items-center justify-center p-2'>
          <p>No books found for: {search}.</p>
        </div>
      )
    }
  }

  return (
    <div className='flex flex-col h-[calc(100%-41px)]'>
      <div className='flex-1 overflow-auto px-6'>
        {data?.items?.map((book: Book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
      {data?.total > 10 && (
        <Pagination
          page={page}
          setPage={setPage}
          total={
            Math.ceil(data.total / 10) > 10 ? 10 : Math.ceil(data.total / 10)
          }
        />
      )}
    </div>
  )
}

export default Books
