import { Component } from 'react'
import Button from './Button'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-h3 mb-2">Something went wrong</h2>
          <p className="text-text-secondary text-sm mb-4">{this.state.error?.message}</p>
          <Button onClick={() => { this.setState({ hasError: false }); window.location.reload() }}>Try Again</Button>
        </div>
      )
    }
    return this.props.children
  }
}
