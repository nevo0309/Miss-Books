const { Link } = ReactRouterDOM
export function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Welcome to Miss Books</h1>
        <p>Your personal gateway to the world of books. Explore, discover, and build your ultimate book collection.</p>

        <div className="features">
          <div className="feature">
            <h2>📚 Discover New Books</h2>
            <p>Search through thousands of books using Google Books API.</p>
          </div>
          <div className="feature">
            <h2>✏️ Manage Your Collection</h2>
            <p>Add, edit, and organize your books with ease.</p>
          </div>
          <div className="feature">
            <h2>🔖 Track Your Reading</h2>
            <p>Keep a record of your reading journey and explore new genres.</p>
          </div>
        </div>

        <Link to="/book" className="cta-btn">
          Start Exploring
        </Link>
      </div>
    </section>
  )
}
