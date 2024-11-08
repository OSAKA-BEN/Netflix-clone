import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return { data, error, isLoading }
}

export default useMovie
