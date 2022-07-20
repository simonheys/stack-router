import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import CloseIcon from "@mui/icons-material/Close"
import { FC } from "react"
import styled from "styled-components"

import { BackButton } from "./BackButton"

export interface INavigationBar {
  back?: boolean
  close?: boolean
  title?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
`

const Title = styled.h4`
  margin: 0;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
`

export const NavigationBar: FC<INavigationBar> = ({ back, close, title }) => {
  return (
    <Container>
      <IconContainer>
        {back && (
          <BackButton>
            <ChevronLeftIcon />
          </BackButton>
        )}
      </IconContainer>
      <Title>{title}</Title>
      <IconContainer>
        {close && (
          <BackButton>
            <CloseIcon />
          </BackButton>
        )}
      </IconContainer>
    </Container>
  )
}
