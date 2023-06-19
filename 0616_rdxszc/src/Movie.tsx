export interface MovieInfo {
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  id?: number
  title: string
  rating: number
  runtime: number
  genres: string[]
  summary: string
  poster: string
  date: number
}

// poster = medium_cover_image
// date = date_uploaded_unix

const Movie = ({
  title,
  rating,
  runtime,
  genres,
  summary,
  poster,
  date,
}: MovieInfo) => {
  return (
    <div className="bg-slate-400 w-fit">
      <img src={poster} alt={`${title}의 포스터`} title={title} />
      <h3 className="bg-slate-700">{title}</h3>
      <h5>{rating}</h5>
      <span>{runtime}</span>
      <span>{date}</span>
      <p>{genres}</p>
      <p>{summary}</p>
    </div>
  )
}

export default Movie
