import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService.query().then((books) => {
      console.log('books', books)

      setBooks(books)
    })
  }
  if (!books) return 'Loading...'
  return (
    <section className="book-index">
      <h1>Book Index</h1>
      <BookList books={books} />
    </section>
  )
}
