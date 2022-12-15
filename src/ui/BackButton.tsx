import { Flex } from "@chakra-ui/react"
import { FC, ReactNode, useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const BackButton: FC<{ children?: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const onClick = useCallback(() => {
    navigate(-1)
  }, [navigate])
  return <Flex onClick={onClick}>{children || "BACK"}</Flex>
}
