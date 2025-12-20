import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    // For HashRouter, we need to check both pathname and hash
    const currentPath = location.pathname + (location.hash || '')
    
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  return null
}

