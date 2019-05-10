import styled, { keyframes } from 'styled-components'

export const AppWrapper = styled.div`
  text-align: center;
`

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const AppHeader = styled.div`
  background-color: #222;
  height: 12rem;
  padding: 1rem;
  color: white;
`

export const AppTitle = styled.h1`
  font-weight: 900;
`

export const AppIntro = styled.p`
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`

export const EmojiWrapper = styled.span.attrs({
  role: 'img',
})``
