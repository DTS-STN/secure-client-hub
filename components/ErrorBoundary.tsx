import { Component, ErrorInfo, ReactNode } from 'react'
import { getLogger } from '../logging/log-util'
import ErrorPage from './ErrorPage'

interface ErrorBoundaryProps {
  children?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
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
