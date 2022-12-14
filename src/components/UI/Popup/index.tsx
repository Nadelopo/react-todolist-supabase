import React, { useEffect, useRef, useState } from 'react'
import { isOutside } from '@/utils/isOutside'
import S from './Popup.module.sass'

interface IPopup {
  id: number
  title: string
  change: (id: number, title: string) => void
  deleteHandler: (id: number) => void
}

export const Popup: React.FC<IPopup> = ({
  id,
  title,
  change,
  deleteHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [changePosition, setChangePosition] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const hidePopup = (e: MouseEvent) => {
    if (isOutside(popupRef, e)) setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) addEventListener('click', hidePopup)
    else removeEventListener('click', hidePopup)

    if (isOpen) setChangePosition(true)
    setTimeout(() => {
      if (!isOpen) setChangePosition(false)
    }, 200)
    return () => removeEventListener('click', hidePopup)
  }, [isOpen])

  return (
    <div className={'flex flex-column ' + (changePosition && 'relative')}>
      <div className={`${S.popup} ${isOpen && S.active}`}>
        <button className="cbtn" onClick={() => deleteHandler(id)}>
          удалить
        </button>

        <button className="cbtn" onClick={() => change(id, title)}>
          изменить
        </button>
      </div>
      <div className={S.dots__wrapper}>
        <div
          ref={popupRef}
          className="flex flex-col gap-y-0.5 items-center w-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={S.dot}></div>
          <div className={S.dot}></div>
          <div className={S.dot}></div>
        </div>
      </div>
    </div>
  )
}
