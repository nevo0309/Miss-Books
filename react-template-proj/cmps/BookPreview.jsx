export function BookPreview({ book }) {
  return (
    <section className="book-preview">
      <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />
      <h4 className="book-title">{book.title}</h4>
      <p className="book-price">
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
    </section>
  )
}
