import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
  return (
    <section>
      <h2>Book List:</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            <section>
              <div className="book-actions">
                <Link to={`/book/${book.id}`}>Details</Link>
                <button className="remove-btn" onClick={() => onRemoveBook(book.id)}>
                  Remove
                </button>
                <button className="edit-btn">Edit</button> {/*need to work on this  */}
              </div>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
