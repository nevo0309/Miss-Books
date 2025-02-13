import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const { useState } = React

export function AddBookReview({ book, setBook }) {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const onSubmitReview = (e) => {
    e.preventDefault()

    //swap between yy/mm/dd => dd/mm/yy
    const [year, month, day] = date.split('-')
    const formattedDate = `${day}/${month}/${year}`

    const newReview = {
      id: utilService.makeId(),
      name,
      review,
      rating: parseInt(rating),
      readAt: formattedDate,
    }

    const updatedBook = { ...book }
    if (!updatedBook.reviews) updatedBook.reviews = []
    updatedBook.reviews.push(newReview)

    bookService
      .save(updatedBook)
      .then(() => {
        setBook(updatedBook)
        showSuccessMsg('Review added')
      })
      .catch((err) => {
        console.log('review add err', err)
        showErrorMsg('Problem add review')
      })
    setName('')
    setReview('')
    setRating(5)
    setDate('')
  }
  //Capture today date
  const today = new Date().toISOString().split('T')[0]
  return (
    <section>
      <form className="add-review-container" onSubmit={onSubmitReview}>
        <h4>Add Review</h4>
        <label htmlFor="name">Enter your name</label>
        <input name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>

        <label htmlFor="review">Add your review</label>
        <textarea name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>

        <label htmlFor="date">Read at</label>
        <input type="date" id="date" name="date" max={today} value={date} onChange={(e) => setDate(e.target.value)} />

        <label htmlFor="rating">Rate</label>
        <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </section>
  )
}
