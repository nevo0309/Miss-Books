import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      console.log(filterBy)

      console.log('books', books)

      setBooks(books)
    })
  }
  function onSetSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }
  function onSetFilterBy(filterBy) {
    setFilterBy({ ...filterBy })
  }
  if (!books) return 'Loading...'
  return (
    <section className="book-index">
      {selectedBookId ? (
        <BookDetails selectedBookId={selectedBookId} />
      ) : (
        <React.Fragment>
          <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <BookList books={books} onSetSelectedBookId={onSetSelectedBookId} />
        </React.Fragment>
      )}
    </section>
  )
}
