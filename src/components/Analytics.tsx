import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

const Analytics = () => {
  const { trackPageView, trackPerformance } = useAnalytics()

  useEffect(() => {
    // Track page view on mount
    trackPageView(window.location.pathname)

    // Track performance metrics after page load
    const handleLoad = () => {
      setTimeout(() => {
        trackPerformance()
      }, 1000) // Wait 1 second after load to get accurate metrics
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageView(window.location.pathname)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [trackPageView, trackPerformance])

  // Track error events
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('JavaScript error:', event.error)
      // Could also send error metrics here
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      // Could also send error metrics here
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null // This component doesn't render anything
}

export default Analytics