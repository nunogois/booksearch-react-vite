function Book({
  volumeInfo: {
    title,
    authors,
    categories,
    averageRating,
    pageCount,
    publishedDate,
    publisher,
    description,
    imageLinks,
    previewLink
  }
}: Book) {
  const metaInfo = [
    pageCount && `${pageCount} pages`,
    publishedDate?.split('-')[0],
    publisher
  ].filter(info => !!info)

  return (
    <div className='border-b border-gray-200 py-6'>
      <div className='flex'>
        <img
          src={imageLinks?.smallThumbnail}
          className='w-10 aspect-[1/1.4142]'
        />
        <div className='flex flex-col justify-center ml-2 gap-1'>
          <p className='text-sm text-gray-700'>{authors?.join(', ')}</p>
          <p className='text-xs text-gray-400'>{categories?.join(', ')}</p>
        </div>
      </div>
      <a href={previewLink} target='_blank'>
        <p className='font-bold text-xl py-2'>{title}</p>
      </a>
      {averageRating && (
        <p>
          {'⭐'.repeat(Math.floor(averageRating))}{' '}
          {averageRating && `(${averageRating})`}
        </p>
      )}
      {metaInfo.length && (
        <p className='text-sm text-gray-500 mt-2'>{metaInfo.join(' • ')}</p>
      )}
      {description && (
        <p className='text-sm text-gray-500 mt-4'>{description}</p>
      )}
    </div>
  )
}

export default Book
