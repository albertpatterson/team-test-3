import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Welcome } from './welcome'

// Mock the SVG imports for consistent snapshots
vi.mock('./logo-dark.svg', () => ({
  default: '/mocked-logo-dark.svg'
}))

vi.mock('./logo-light.svg', () => ({
  default: '/mocked-logo-light.svg'
}))

describe('Welcome Component - Snapshot Tests', () => {
  it('should match snapshot', () => {
    const { container } = render(<Welcome />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should have consistent structure', () => {
    const { container } = render(<Welcome />)
    
    // Verify the basic structure remains consistent
    const main = container.querySelector('main')
    expect(main).toBeTruthy()
    
    const header = container.querySelector('header')
    expect(header).toBeTruthy()
    
    const nav = container.querySelector('nav')
    expect(nav).toBeTruthy()
    
    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(2)
    
    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(2)
  })
})
