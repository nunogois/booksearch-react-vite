import { useState, useMemo, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query' // Using React Query: https://github.com/tannerlinsley/react-query
import debounce from 'lodash.debounce' // Using lodash debounce for the debounce on the search input: https://lodash.com/docs/4.17.15#debounce

import Filter from './components/Filter'
import Books from './components/Books'

const queryClient = new QueryClient()

function App() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const debounceSetSearch = useMemo(
    () => debounce((search: string) => setSearch(search), 500), // https://dmitripavlutin.com/react-throttle-debounce/#3-debouncing-a-callback-second-attempt
    []
  )

  useEffect(() => {
    return () => {
      debounceSetSearch.cancel() // Cleanup the debounce on unmount: https://dmitripavlutin.com/react-throttle-debounce/#5-cleanup
    }
  }, [])

  return (
    <div className='flex flex-col md:flex-row h-full gap-2 md:gap-10 px-6 md:p-20 max-w-6xl m-auto'>
      <Filter filter={filter} setFilter={setFilter} />
      <div className='bg-white shadow-sm rounded w-full max-h-full'>
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
