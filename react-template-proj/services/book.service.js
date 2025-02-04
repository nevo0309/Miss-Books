import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOKS_KEY = 'booksDB'
_createBooks()

export const bookService = {
  get,
  remove,
  save,
  query,
}

function query() {
  return storageService.query(BOOKS_KEY).then((books) => {
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}
function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    return storageService.post(BOOKS_KEY, book)
  }
}

function _createBooks() {
  let books = utilService.loadFromStorage('BOOKS_KEY')
  if (!books || !books.length) {
    books = []
    books.push(_createBook())
    books.push(_createBook())
    books.push(_createBook())

    utilService.saveToStorage(BOOKS_KEY, books)
  }
}

function _createBook() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  return {
    id: utilService.makeId(),
    title: utilService.makeLorem(2),
    subtitle: utilService.makeLorem(4),
    authors: [utilService.makeLorem(1)],
    publishedDate: utilService.getRandomIntInclusive(1950, 2024),
    description: utilService.makeLorem(20),
    pageCount: utilService.getRandomIntInclusive(20, 600),
    categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
    thumbnail: `http://coding-academy.org/books-photos/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
    language: 'en',
    listPrice: {
      amount: utilService.getRandomIntInclusive(80, 500),
      currencyCode: 'EUR',
      isOnSale: Math.random() > 0.7,
    },
  }
}
