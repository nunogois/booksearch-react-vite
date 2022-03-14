import { useState, useMemo, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query' // Using React Query: https://github.com/tannerlinsley/react-query
import debounce from 'lodash.debounce' // Using lodash debounce for the debounce on the search input: https://lodash.com/docs/4.17.15#debounce

import Books from './components/Books'

const queryClient = new QueryClient()

function App() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const debounceSetSearch = useMemo(
    () => debounce((search: string) => setSearch(search), 500),
    []
  )

  useEffect(() => {
    return () => {
      debounceSetSearch.cancel() // Cleanup the debounce on unmount
    }
  }, [])

  return (
    <div className='flex flex-col md:flex-row h-full justify-center gap-2 md:gap-10 px-6 md:p-20'>
      <div>
        <p className='font-bold'>Filter your results</p>
        <select
          className='mt-2 p-2 rounded border border-gray-300 w-full md:w-auto'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value='all'>All books</option>
          <option value='partial'>Partial Preview</option>
          <option value='full'>Full Preview</option>
          <option value='ebooks'>eBooks</option>
          <option value='free-ebooks'>Free eBooks</option>
          <option value='paid-ebooks'>Paid eBooks</option>
        </select>
      </div>
      <div className='bg-white shadow-sm rounded w-full h-[1050px] max-h-full'>
        <div className='flex p-2 border-b w-full rounded-t'>
          <span className='ml-2 mr-4'>🔍</span>
          <input
            className='flex-1 outline-none'
            placeholder='Start searching...'
            onChange={e => debounceSetSearch(e.target.value)}
          />
        </div>
        <QueryClientProvider client={queryClient}>
          <Books search={search} filter={filter} />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
