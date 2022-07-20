import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { FC, ReactNode } from "react"
import { Link, LinkProps } from "react-router-dom"
import styled from "styled-components"

export interface ITableCell extends LinkProps {
  label?: string
  children?: ReactNode
}

const Container = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  align-self: stretch;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  transition: background-color 0.1s;
`

export const TableCellLink: FC<ITableCell> = ({ label, children, ...rest }) => {
  return (
    <Container {...rest}>
      {label}
      <>{children}</>
      <ChevronRightIcon />
    </Container>
  )
}
