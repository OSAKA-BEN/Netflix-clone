'use client'

import MovieList from '@/components/MovieList'
import useFavorites from '@/hooks/useFavorites'
import useMoviesList from '@/hooks/useMoviesList'

export default function MovieListContainer({ title }: { title: string }) {
  const { data: movies = [] } = useMoviesList()
  const { data: favoriteMovies = [] } = useFavorites()

  const data = title === 'My List' ? favoriteMovies : movies

  return <MovieList title={title} data={data} />
}
