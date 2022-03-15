interface FilterProps {
  filter: string
  setFilter: (filter: string) => void
}

function Filter({ filter, setFilter }: FilterProps) {
  return (
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
  )
}

export default Filter
