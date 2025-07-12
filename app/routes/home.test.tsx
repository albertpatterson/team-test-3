import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home, { meta } from './home'

// Mock the Welcome component since it has complex styling and images
vi.mock('../welcome/welcome', () => ({
  Welcome: () => <div data-testid="welcome-component">Welcome Component</div>
}))

describe('Home', () => {
  it('renders the Welcome component', () => {
    render(<Home />)
    
    expect(screen.getByTestId('welcome-component')).toBeInTheDocument()
  })

  it('displays welcome text', () => {
    render(<Home />)
    
    expect(screen.getByText('Welcome Component')).toBeInTheDocument()
  })
})

describe('Home meta function', () => {
  it('returns correct meta tags', () => {
    const metaTags = meta({} as any)
    
    expect(metaTags).toEqual([
      { title: "New React Router App" },
      { name: "description", content: "Welcome to React Router!" },
    ])
  })

  it('returns an array with 2 meta tags', () => {
    const metaTags = meta({} as any)
    
    expect(metaTags).toHaveLength(2)
  })

  it('includes the correct title', () => {
    const metaTags = meta({} as any)
    const titleTag = metaTags.find(tag => 'title' in tag)
    
    expect(titleTag).toEqual({ title: "New React Router App" })
  })

  it('includes the correct description', () => {
    const metaTags = meta({} as any)
    const descriptionTag = metaTags.find(tag => 'name' in tag && tag.name === 'description')
    
    expect(descriptionTag).toEqual({ name: "description", content: "Welcome to React Router!" })
  })
})
