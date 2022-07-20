import { Action as NavigationType } from "history"
import {
  FC,
  HTMLProps,
  UIEvent,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react"
import { useNavigationType } from "react-router-dom"

interface IScrollPosition {
  scrollTop: number
  scrollLeft: number
}

export interface IScrollRestorationStorage {
  get: (key: string) => IScrollPosition | undefined
  set: (key: string, value: IScrollPosition) => void
}

const memoryStorage: IScrollRestorationStorage = new Map<
  string,
  IScrollPosition
>()

export interface IScrollRestoration extends HTMLProps<HTMLDivElement> {
  scrollId: string
  storage?: IScrollRestorationStorage
}

export const ScrollRestoration: FC<IScrollRestoration> = ({
  scrollId,
  storage = memoryStorage,
  onScroll: passedOnScroll,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType === NavigationType.Pop) {
      const value = storage.get(scrollId)
      if (value && ref.current) {
        const { scrollTop, scrollLeft } = value
        ref.current.scroll(scrollLeft, scrollTop)
      }
    }
  }, [navigationType, scrollId, storage])

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollLeft } = e.currentTarget
      storage.set(scrollId, { scrollTop, scrollLeft })
      passedOnScroll && passedOnScroll(e)
    },
    [passedOnScroll, scrollId, storage],
  )

  return <div ref={ref} onScroll={onScroll} {...rest} />
}
