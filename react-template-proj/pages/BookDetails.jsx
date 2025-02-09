import { bookService } from '../services/book.service.js'
const { useState, useEffect } = React

export function BookDetails({ selectedBookId, onSetSelectedBookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [selectedBookId])

  function loadBook() {
    if (!selectedBookId) return
    bookService.get(selectedBookId).then((book) => {
      setBook(book)
    })
  }
  function getPriceClass() {
    if (book.listPrice.amount > 150) return 'high-price'
    else if (book.listPrice.amount < 50) return 'low-price'
    return ''
  }
  function getPublishDate() {
    const currYear = new Date().getFullYear()
    let publishedYear = book.publishedDate
    let publishDateTxt = ''
    let diff = currYear - publishedYear
    if (diff > 10) publishDateTxt = ' - Vintage'
    else if (diff < 3) publishDateTxt = ' - NEW!'
    return publishDateTxt
  }

  function getPageCount() {
    let pageCount = ''
    if (book.pageCount > 500) pageCount = ' - Long reading'
    else if (book.pageCount > 200) pageCount = ' - Decent reading'
    else if (book.pageCount < 100) pageCount = ' - Light reading'
    return pageCount
  }

  if (!book) return <p>Loading book details...</p>

  return (
    <section className="book-details">
      {/* Title */}
      <h2 className="title-detail">{book.title.toUpperCase()}</h2>
      <h3 className="subtitle-detail">{book.subtitle}</h3>

      {/* Book Cover */}
      <div className="thumbnail-detail">
        <img src={book.thumbnail} alt="Book cover" />
      </div>

      {/* Book Info */}
      <div className="book-info">
        <p className="authors-detail">
          <strong>Author(s):</strong> {book.authors.join(', ')}
        </p>
        <p className="publishedDate-detail">
          <span className="book-details-info-title"> Year publish: </span>
          <span className="book-details-info-publishDate"> {book.publishedDate}:</span>
          <span className="book-details-info-text">{getPublishDate()}</span>
        </p>
        <p className="language-detail">
          <strong>Language:</strong> {book.language.toUpperCase()}
        </p>
        <p className="categories-detail">
          <strong>Category:</strong> {book.categories.join(', ')}
        </p>
        <p className="pageCount-detail">
          <span className="book-details-info-title">Pages: </span>
          <span className="book-details-info-pageCount">{book.pageCount}</span>
          <span className="book-details-info-text">{getPageCount()}</span>
        </p>
        <p className="description-detail">
          <strong>Description:</strong> {book.description}
        </p>
      </div>

      <div className="price-detail">
        <p className={'amount ' + getPriceClass()}>
          {book.listPrice.amount} {book.listPrice.currencyCode}
        </p>
        {/* {book.listPrice.isOnSale && <span className="sale-tag">On Sale!</span>} */}
      </div>
      <button onClick={() => onSetSelectedBookId(null)}>Back</button>
    </section>
  )
}
