import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Welcome } from './welcome'

// Mock the SVG imports
vi.mock('./logo-dark.svg', () => ({
  default: '/mocked-logo-dark.svg'
}))

vi.mock('./logo-light.svg', () => ({
  default: '/mocked-logo-light.svg'
}))

describe('Welcome Component', () => {
  it('renders without crashing', () => {
    render(<Welcome />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('displays both light and dark logos', () => {
    render(<Welcome />)
    
    const logos = screen.getAllByAltText('React Router')
    expect(logos).toHaveLength(2)
    
    // Check for light logo
    const lightLogo = logos.find(logo => 
      logo.className.includes('block') && logo.className.includes('dark:hidden')
    )
    expect(lightLogo).toBeInTheDocument()
    expect(lightLogo).toHaveAttribute('src', '/mocked-logo-light.svg')
    
    // Check for dark logo
    const darkLogo = logos.find(logo => 
      logo.className.includes('hidden') && logo.className.includes('dark:block')
    )
    expect(darkLogo).toBeInTheDocument()
    expect(darkLogo).toHaveAttribute('src', '/mocked-logo-dark.svg')
  })

  it('displays "What\'s next?" text', () => {
    render(<Welcome />)
    expect(screen.getByText("What's next?")).toBeInTheDocument()
  })

  it('renders React Router Docs link', () => {
    render(<Welcome />)
    
    const docsLink = screen.getByRole('link', { name: /React Router Docs/i })
    expect(docsLink).toBeInTheDocument()
    expect(docsLink).toHaveAttribute('href', 'https://reactrouter.com/docs')
    expect(docsLink).toHaveAttribute('target', '_blank')
    expect(docsLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders Join Discord link', () => {
    render(<Welcome />)
    
    const discordLink = screen.getByRole('link', { name: /Join Discord/i })
    expect(discordLink).toBeInTheDocument()
    expect(discordLink).toHaveAttribute('href', 'https://rmx.as/discord')
    expect(discordLink).toHaveAttribute('target', '_blank')
    expect(discordLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders all resource links', () => {
    render(<Welcome />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2) // React Router Docs + Join Discord
    
    // Verify all links open in new tab
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('displays SVG icons for each resource', () => {
    render(<Welcome />)
    
    // Check for SVG elements (icons)
    const svgElements = screen.getAllByRole('img', { hidden: true })
    expect(svgElements.length).toBeGreaterThanOrEqual(2) // At least 2 icons
  })

  it('has proper navigation structure', () => {
    render(<Welcome />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2) // 2 resource links
  })

  it('applies correct CSS classes for styling', () => {
    render(<Welcome />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex', 'items-center', 'justify-center', 'pt-16', 'pb-4')
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('rounded-3xl', 'border', 'border-gray-200', 'p-6', 'dark:border-gray-700', 'space-y-4')
  })

  it('has accessible link text', () => {
    render(<Welcome />)
    
    // Check that links have descriptive text
    expect(screen.getByText('React Router Docs')).toBeInTheDocument()
    expect(screen.getByText('Join Discord')).toBeInTheDocument()
  })
})
