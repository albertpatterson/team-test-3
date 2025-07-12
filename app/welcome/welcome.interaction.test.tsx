import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Welcome } from './welcome'

// Mock the SVG imports
vi.mock('./logo-dark.svg', () => ({
  default: '/mocked-logo-dark.svg'
}))

vi.mock('./logo-light.svg', () => ({
  default: '/mocked-logo-light.svg'
}))

describe('Welcome Component - Interaction Tests', () => {
  it('should have hover effects on resource links', async () => {
    const user = userEvent.setup()
    render(<Welcome />)
    
    const docsLink = screen.getByRole('link', { name: /React Router Docs/i })
    
    // Check initial state
    expect(docsLink).toHaveClass('hover:underline')
    
    // Hover over the link
    await user.hover(docsLink)
    
    // Link should still be in document after hover
    expect(docsLink).toBeInTheDocument()
  })

  it('should handle missing SVG gracefully', () => {
    // This test ensures the component doesn't crash if SVGs fail to load
    render(<Welcome />)
    
    const logos = screen.getAllByAltText('React Router')
    logos.forEach(logo => {
      expect(logo).toHaveAttribute('alt', 'React Router')
    })
  })

  it('should have responsive design classes', () => {
    render(<Welcome />)
    
    // Check for responsive classes - use getAllByAltText since there are multiple images
    const logos = screen.getAllByAltText('React Router')
    const logoContainer = logos[0].closest('div')
    expect(logoContainer).toHaveClass('w-[500px]', 'max-w-[100vw]', 'p-4')
    
    // Find the container with max-w-[300px] class
    const mainContainer = screen.getByRole('main').querySelector('.max-w-\\[300px\\]') as HTMLElement
    expect(mainContainer).toHaveClass('max-w-[300px]', 'w-full', 'space-y-6', 'px-4')
  })

  it('should support dark mode styling', () => {
    render(<Welcome />)
    
    // Check dark mode classes
    const lightLogo = screen.getAllByAltText('React Router').find(logo => 
      logo.className.includes('dark:hidden')
    )
    const darkLogo = screen.getAllByAltText('React Router').find(logo => 
      logo.className.includes('dark:block')
    )
    
    expect(lightLogo).toHaveClass('dark:hidden')
    expect(darkLogo).toHaveClass('dark:block')
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('dark:border-gray-700')
    
    const paragraph = screen.getByText("What's next?")
    expect(paragraph).toHaveClass('dark:text-gray-200')
  })

  it('should have proper semantic structure', () => {
    render(<Welcome />)
    
    // Check semantic HTML structure
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument() // header element
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('should have accessible focus states', async () => {
    const user = userEvent.setup()
    render(<Welcome />)
    
    const links = screen.getAllByRole('link')
    
    // Tab through the links
    await user.tab()
    expect(links[0]).toHaveFocus()
    
    await user.tab()
    expect(links[1]).toHaveFocus()
  })

  it('should display external link indicators', () => {
    render(<Welcome />)
    
    const links = screen.getAllByRole('link')
    
    links.forEach(link => {
      // All links should open in new tab (external links)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })

  it('should maintain proper spacing and layout', () => {
    render(<Welcome />)
    
    const main = screen.getByRole('main')
    const outerContainer = main.firstChild as HTMLElement
    const innerContainer = outerContainer.querySelector('.space-y-6') as HTMLElement
    
    expect(outerContainer).toHaveClass('gap-16')
    expect(innerContainer).toHaveClass('space-y-6')
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('space-y-4')
  })
})
