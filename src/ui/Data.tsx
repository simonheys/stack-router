import { FC } from "react"

import { useStackContext } from "../lib/StackContext"

export const Data: FC = () => {
  const locationContext = useStackContext()
  return (
    <pre style={{ textAlign: "left", fontSize: 8 }}>
      {JSON.stringify(locationContext, null, 2)}
    </pre>
  )
}
