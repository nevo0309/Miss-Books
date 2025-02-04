import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
  return (
    <section>
      <h2>Book List:</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            <section>
              <button>Delete</button>
              <button>Details</button>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
