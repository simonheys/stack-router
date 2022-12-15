import { Flex } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"
import { FC } from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { RootRoutes } from "./routes/RootRoutes"

const App: FC = () => {
  return (
    <ChakraProvider>
      <Flex
        w="100vw"
        h="100vh"
        px={[0, "20%"]}
        overflow={"hidden"}
        bg={"black"}
        color={"white"}
      >
        <Router>
          <RootRoutes />
        </Router>
      </Flex>
    </ChakraProvider>
  )
}

export default App
