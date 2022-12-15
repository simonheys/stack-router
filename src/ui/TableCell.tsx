import { ChevronRightIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { Link } from "react-router-dom"

export interface ITableCell extends ComponentProps<typeof Flex> {
  label?: string
}

export const TableCellLink: FC<ITableCell> = ({ label, children, ...rest }) => {
  return (
    <Flex
      as={Link}
      gap={"12px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={"16px"}
      py={"12px"}
      alignSelf={"stretch"}
      borderTop={"1px solid rgba(255, 255, 255, 0.2);"}
      color={"white"}
      textDecoration={"none"}
      {...rest}
    >
      {label}
      <>{children}</>
      <ChevronRightIcon />
    </Flex>
  )
}
