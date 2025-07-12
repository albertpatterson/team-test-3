import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './home'

describe('Home Integration', () => {
  it('renders without crashing', () => {
    render(<Home />)
    
    // Check if the component renders without throwing
    expect(document.body).toBeInTheDocument()
  })

  it('renders React Router logo alt text', () => {
    render(<Home />)
    
    // The Welcome component should render React Router images
    const images = screen.getAllByAltText('React Router')
    expect(images.length).toBeGreaterThan(0)
  })

  it('renders navigation links', () => {
    render(<Home />)
    
    // The Welcome component should render some navigation
    expect(screen.getByText("What's next?")).toBeInTheDocument()
  })
})
