import * as React from 'react'
import * as styled from './App.styled'

import { Logo } from '../Logo'

class App extends React.Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/hello')
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message)
    return body
  }

  handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault()
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    })
    const body = await response.text()
    this.setState({ responseToPost: body })
  }

  render() {
    return (
      <styled.AppWrapper>
        <styled.AppHeader>
          <Logo />
          <styled.AppTitle>Welcome to React</styled.AppTitle>
        </styled.AppHeader>
        <styled.AppIntro>
          Bootstrapped with <code>create-react-app</code>.
        </styled.AppIntro>
        <styled.AppIntro>
          Components styled with <code>styled-components</code>{' '}
          <styled.EmojiWrapper aria-label="nail polish" />
        </styled.AppIntro>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </styled.AppWrapper>
    )
  }
}

export default App
