import React from 'react'
import { getLogger } from '../logging/log-util'
import { ErrorPage } from '../components/ErrorPage'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    const logger = getLogger(`400 error page`)
    logger.level = 'error'
    logger.error(error)
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <ErrorPage
          lang={'en'}
          errType="500"
          isAuth={false}
          homePageLink={'/en/my-dashboard'}
          accountPageLink="/"
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
