import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import NewBookForm from './NewBookForm'
import BookList from './BookList'
import Footer from './Footer'

const Home = ({ userName, email }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/user/${userName}/books`
        )
        const data = await response.json()
        if (data) {
          setBooks(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching books:', error)
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return (
    <>
      <Header userName={userName} email={email} />
      <div className="container">
        <NewBookForm userName={userName} setBooks={setBooks} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BookList userName={userName} books={books} setBooks={setBooks} />
        )}
      </div>
      <Footer />
    </>
  )
}

export default Home
