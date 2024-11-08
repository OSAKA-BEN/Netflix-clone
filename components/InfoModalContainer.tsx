'use client'

import { useInfoModal } from '@/hooks/useInfoModal'
import InfoModal from './InfoModal'

const InfoModalContainer = () => {
  const { isOpen, onClose } = useInfoModal()

  return <InfoModal visible={isOpen} onClose={onClose} />
}

export default InfoModalContainer
