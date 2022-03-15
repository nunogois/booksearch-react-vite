function Pagination({
  page,
  setPage,
  total
}: {
  page: number
  setPage: (p: number) => void
  total: number
}) {
  return (
    <div className='flex justify-center flex-wrap select-none gap-1 p-2'>
      <button
        className={
          'border border-1 border-gray-300 rounded py-1 w-8 text-sm' +
          (page === 1 ? ' bg-zinc-400 text-white' : '')
        }
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        ◀
      </button>
      {Array.from({ length: total }).map((_, i) => (
        <button
          className={
            'border border-1 border-gray-300 rounded font-bold py-1 w-8 text-sm' +
            (page === i + 1 ? ' border-indigo-600 text-indigo-600' : '')
          }
          key={i}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={
          'border border-1 border-gray-300 rounded py-1 w-8 text-sm' +
          (page === total ? ' bg-zinc-400 text-white' : '')
        }
        onClick={() => setPage(page + 1)}
        disabled={page === total}
      >
        ▶
      </button>
    </div>
  )
}

export default Pagination
