const { Link } = ReactRouterDOM
export function About() {
  return (
    <section className="about">
      <div className="about-content">
        <h1>About Miss Books</h1>
        <p>
          Welcome to <strong>Miss Books</strong>, your go-to destination for discovering, exploring, and adding books to your collection! Whether you're an avid reader or just starting your literary journey, we provide an intuitive and enjoyable experience to find and manage books with ease.
        </p>

        <h2>Our Mission</h2>
        <p>At Miss Books, we believe in the power of books to inspire, educate, and entertain. Our platform is designed to help you discover new titles, track your reading progress, and build your personal book collection effortlessly.</p>

        <h2>What You Can Do Here</h2>
        <ul>
          <li>Search for books using Google</li>
          <li>Add books to your collection</li>
          <li>Edit and manage book details</li>
          <li>Discover new reads and genres</li>
        </ul>

        <h2>Get in Touch</h2>
        <p>
          Have any questions or suggestions? Feel free to <Link to="/contact">contact us</Link>! We love hearing from fellow book enthusiasts.
        </p>
      </div>
    </section>
  )
}
