export function BookPreview({ book }) {
  return (
    <section className="book-preview">
      <h4>{book.title}</h4>
      <h4>{book.subtitle}</h4>
      <h4>{book.authors}</h4>
    </section>
  )
}
