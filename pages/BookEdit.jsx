import { bookService } from '../services/book.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  console.log(bookToEdit)

  const categoryOptions = ['Computers', 'Science', 'History', 'Fantasy', 'Romance', 'Horror', 'Mystery', 'Self-Help', 'Biography', 'Poetry', 'Thriller', 'Adventure', 'Young Adult', 'Science Fiction', 'Philosophy', 'Psychology', 'Health & Wellness']

  const { title, subtitle, authors, publishedDate, description, pageCount, categories, language, thumbnail, listPrice } = bookToEdit
  const { amount: price, currencyCode, isOnSale } = bookToEdit.listPrice || {}

  const navigate = useNavigate()

  // const params = useParams()
  // console.log(params)
  const { bookId } = useParams()
  console.log(bookId)

  useEffect(() => {
    if (bookId) loadBooks()
  }, [])
  function loadBooks() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('Problem get book', err))
  }
  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (field === 'price') {
      setBookToEdit((prevBookToEdit) => ({
        ...prevBookToEdit,
        listPrice: { ...prevBookToEdit.listPrice, amount: value },
      }))
      return
    }

    if (field === 'categories') {
      value = target.value
    }

    if (field === 'authors') {
      value = value.split(',').map((item) => item.trim())
    }

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }

    setBookToEdit((prevBookToEdit) => {
      if (field === 'currencyCode' || field === 'isOnSale') {
        return {
          ...prevBookToEdit,
          listPrice: { ...prevBookToEdit.listPrice, [field]: value },
        }
      }
      return { ...prevBookToEdit, [field]: value }
    })
  }

  function onSubmitBook(ev) {
    ev.preventDefault()
    const bookToSave = {
      ...bookToEdit,
      listPrice: {
        ...bookToEdit.listPrice,
        amount: +bookToEdit.listPrice.amount,
      },
    }

    bookService
      .save(bookToSave)
      .then((savedBook) => {
        console.log('Saved book:', savedBook)
        showSuccessMsg('Book Saved')
        navigate('/book')
      })
      .catch((err) => {
        showErrorMsg('Problem saving')
        console.log('There is a problem:', err)
      })
  }

  return (
    <section className="edit-container">
      <h2>{bookId ? 'Edit book' : 'Add book'}</h2>
      <form onSubmit={onSubmitBook}>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" id="title" value={bookToEdit && title ? title : ''} onChange={handleChange} />

        <label htmlFor="subtitle">Subtitle</label>
        <input name="subtitle" type="text" id="subtitle" value={bookToEdit && subtitle ? subtitle : ''} onChange={handleChange} />

        <label htmlFor="authors">Authors</label>
        <input name="authors" type="text" id="authors" value={bookToEdit && Array.isArray(authors) ? authors.join(', ') : ''} onChange={handleChange} />

        <label htmlFor="categories">Category</label>
        <select name="categories" id="categories" value={bookToEdit && categories ? categories : ''} onChange={handleChange}>
          <option value="">Select a category</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="publishedDate">Published Year</label>
        <input name="publishedDate" type="number" id="publishedDate" value={bookToEdit && publishedDate ? publishedDate : ''} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" value={bookToEdit && description ? description : ''} onChange={handleChange}></textarea>

        <label htmlFor="pageCount">Page Count</label>
        <input name="pageCount" type="number" id="pageCount" value={bookToEdit && pageCount ? pageCount : ''} onChange={handleChange} />

        <label htmlFor="language">Language</label>
        <input name="language" type="text" id="language" value={bookToEdit && language ? language : ''} onChange={handleChange} />

        <label htmlFor="price">Price</label>
        <input name="price" type="text" id="price" value={bookToEdit && listPrice ? price : ''} onChange={handleChange} />

        <label htmlFor="currencyCode">Currency</label>
        <select name="currencyCode" id="currencyCode" value={bookToEdit && listPrice ? currencyCode : ''} onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ILS">ILS</option>
        </select>

        <label htmlFor="isOnSale">
          <input type="checkbox" name="isOnSale" id="isOnSale" checked={bookToEdit && listPrice ? isOnSale : false} onChange={handleChange} />
          On Sale
        </label>

        <button>Submit</button>
      </form>
    </section>
  )
}
