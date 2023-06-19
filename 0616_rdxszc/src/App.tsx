import Movie, { MovieInfo } from "Movie"
import axios from "axios"
import { useEffect, useState } from "react"

interface APIMovieInfo extends Omit<MovieInfo, "poster" | "date"> {
  medium_cover_image: string
  date_uploaded_unix: number
}
const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState<APIMovieInfo[]>([])

  const getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=year&minimum_rating=8",
    )
    setMovies(movies)
    setIsLoading(false)
  }
  useEffect(() => {
    getMovies()
  })
  return (
    <section className="flex">
      {isLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex divide-x-2">
          {movies.map((movie) => {
            const { title, id, rating, runtime, genres, summary } = movie
            return (
              <Movie
                key={id}
                poster={movie.medium_cover_image}
                date={movie.date_uploaded_unix}
                id={id}
                title={title}
                rating={rating}
                runtime={runtime}
                genres={genres}
                summary={summary}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default App
