import { FC, ReactNode, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
  transition: opacity 0.1s;
`

export const BackButton: FC<{ children?: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const onClick = useCallback(() => {
    navigate(-1)
  }, [navigate])
  return <Container onClick={onClick}>{children || "BACK"}</Container>
}
