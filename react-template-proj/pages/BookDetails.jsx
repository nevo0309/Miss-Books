import { bookService } from '../services/book.service.js'
const { useState, useEffect } = React

export function BookDetails({ selectedBookId }) {
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
          <strong>Published:</strong> {book.publishedDate}
        </p>
        <p className="language-detail">
          <strong>Language:</strong> {book.language.toUpperCase()}
        </p>
        <p className="categories-detail">
          <strong>Category:</strong> {book.categories.join(', ')}
        </p>
        <p className="pageCount-detail">
          <strong>Pages:</strong> {book.pageCount}
        </p>
        <p className="description-detail">
          <strong>Description:</strong> {book.description}
        </p>
      </div>

      <div className="price-detail">
        <p className="amount">
          {book.listPrice.amount} {book.listPrice.currencyCode}
        </p>
        {/* {book.listPrice.isOnSale && <span className="sale-tag">On Sale!</span>} */}
      </div>
    </section>
  )
}
