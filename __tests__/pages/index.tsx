import {render, screen} from '@testing-library/react'
import App from 'pages/index'

// TODO: There should be a more elegant way to mock the router.
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Index Page', () => {
  it('renders without crashing', () => {
    render(<App />)

    expect(screen.getByText('My Blog')).toBeInTheDocument()
  })
})
