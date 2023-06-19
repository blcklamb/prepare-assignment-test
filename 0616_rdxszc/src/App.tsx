import axios from "axios"
import { useEffect, useState } from "react"

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json")
    setMovies(movies)
    setIsLoading(false)
  }
  useEffect(() => {
    getMovies()
  })
  return <div>{isLoading ? "Loading..." : "We are ready"}</div>
}

export default App
