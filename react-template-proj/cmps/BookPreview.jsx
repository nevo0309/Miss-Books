const { useState } = React

export function BookPreview({ book }) {
  const [fullDescription, setFullDescription] = useState(false)
  const originalPrice = book.listPrice.amount
  const discountedPrice = (originalPrice * 0.5).toFixed(2).replace(/\.00$/, '')

  function showMoreDescrip() {
    setFullDescription((prevState) => !prevState)
  }

  return (
    <section className="book-preview">
      <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />
      {book.listPrice.isOnSale && (
        <div className="ribbon">
          <span>On Sale</span>
        </div>
      )}

      <h4 className="book-title">Title: {book.title}</h4>
      <p className="book-description">
        <strong>Description:</strong> {fullDescription ? book.description : `${book.description.substring(0, 100)}...`}
        <button className="read-more" onClick={showMoreDescrip}>
          {fullDescription ? ' Show Less' : ' Read More'}
        </button>
      </p>

      {book.listPrice.isOnSale ? (
        <p className="book-price">
          <span className="original-price">
            {originalPrice} {book.listPrice.currencyCode}
          </span>
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
