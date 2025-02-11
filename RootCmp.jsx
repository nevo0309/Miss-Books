const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

import { BookEdit } from './pages/BookEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { BookDetails } from './pages/BookDetails.jsx'

const { useState } = React

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout"></main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookIndex />} />
          <Route path="/about" element={<About />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/book/edit" element={<BookEdit />} />
          <Route path="/book/edit/:bookId" element={<BookEdit />} />
        </Routes>
      </section>
      <UserMsg />
    </Router>
  )
}
