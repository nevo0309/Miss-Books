const { NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section>
        <h1>Miss Books </h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/book">Books</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
    </header>
  )
}
