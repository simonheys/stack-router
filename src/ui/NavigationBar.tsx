import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons"
import { Center, Flex, Text } from "@chakra-ui/react"
import { FC } from "react"

import { BackButton } from "./BackButton"

export interface INavigationBar {
  back?: boolean
  close?: boolean
  title?: string
}

export const NavigationBar: FC<INavigationBar> = ({ back, close, title }) => {
  return (
    <Flex
      gap={"12px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      alignSelf={"stretch"}
      color={"white"}
      bg={"rgba(255, 255, 255, 0.1)"}
    >
      <Center w={"44px"} h={"44px"}>
        {back && (
          <BackButton>
            <ChevronLeftIcon />
          </BackButton>
        )}
      </Center>
      <Text as={"h4"} m={0}>
        {title}
      </Text>
      <Center w={"44px"} h={"44px"}>
        {close && (
          <BackButton>
            <CloseIcon />
          </BackButton>
        )}
      </Center>
    </Flex>
  )
}
