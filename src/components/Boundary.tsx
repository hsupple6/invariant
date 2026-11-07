import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback: ReactNode
  onError?: (error: Error) => void
}

type State = { error: boolean }

export class Boundary extends Component<Props, State> {
  state: State = { error: false }

  static getDerivedStateFromError(): State {
    return { error: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error)
  }

  render() {
    if (this.state.error) return this.props.fallback
    return this.props.children
  }
}
