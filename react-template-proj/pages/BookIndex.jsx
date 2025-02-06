import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService.query().then((books) => {
      console.log('books', books)

      setBooks(books)
    })
  }
  function onSetSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }
  if (!books) return 'Loading...'
  return <section className="book-index">{selectedBookId ? <BookDetails selectedBookId={selectedBookId} /> : <BookList books={books} onSetSelectedBookId={onSetSelectedBookId} />}</section>
}
