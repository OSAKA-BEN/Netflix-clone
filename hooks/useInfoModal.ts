import { create } from 'zustand'

interface InfoModalStore {
  movieId?: string
  isOpen: boolean
  onOpen: (movieId: string) => void
  onClose: () => void
}

export const useInfoModal = create<InfoModalStore>((set) => ({
  movieId: undefined,
  isOpen: false,
  onOpen: (movieId: string) => set({ isOpen: true, movieId }),
  onClose: () => set({ isOpen: false, movieId: undefined }),
}))
