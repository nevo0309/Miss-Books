export function BookPreview({ book }) {
  const originalPrice = book.listPrice.amount
  const discountedPrice = (originalPrice * 0.5).toFixed(2).replace(/\.00$/, '')
  return (
    <section className="book-preview">
      <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />
      {book.listPrice.isOnSale && (
        <div className="ribbon">
          <span>On Sale</span>
        </div>
      )}
      <h4 className="book-title">{book.title}</h4>
      {book.listPrice.isOnSale ? (
        <p className="book-price">
          <span className="original-price">
            {originalPrice} {book.listPrice.currencyCode}
          </span>
          <br />
          <span className="discount-label">-50%</span>
          <br />
          <span className="discounted-price">
            {discountedPrice} {book.listPrice.currencyCode}
          </span>
        </p>
      ) : (
        <p className="book-price">
          {originalPrice} {book.listPrice.currencyCode}
        </p>
      )}
    </section>
  )
}
