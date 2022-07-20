import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

import { RootRoutes } from "./routes/RootRoutes"

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: black;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    padding: 0 20%;
  }
`

function App() {
  return (
    <Container>
      <Router>
        <RootRoutes />
      </Router>
    </Container>
  )
}

export default App
