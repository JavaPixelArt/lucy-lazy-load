import * as React from 'react'
import Images from '../Images'
import { GlobalStyle } from './App.styled'

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Images />
      </>
    )
  }
}

export default App
