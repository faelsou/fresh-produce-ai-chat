import { useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface AnalyticsEvent {
  event_type: string
  page_path: string
  event_data?: Record<string, any>
}

interface PerformanceData {
  load_time?: number
  first_contentful_paint?: number
  largest_contentful_paint?: number
  cumulative_layout_shift?: number
  first_input_delay?: number
}

export const useAnalytics = () => {
  const sessionId = sessionStorage.getItem('analytics_session') || 
    Math.random().toString(36).substring(7)

  useEffect(() => {
    if (!sessionStorage.getItem('analytics_session')) {
      sessionStorage.setItem('analytics_session', sessionId)
    }
  }, [sessionId])

  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const eventData = {
        ...event,
        user_agent: navigator.userAgent,
        session_id: sessionId,
        timestamp: new Date().toISOString()
      }

      // Enviar para edge function analytics
      await supabase.functions.invoke('analytics', {
        body: eventData
      })

      console.log('Event tracked:', event.event_type)
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }, [sessionId])

  const trackPageView = useCallback(async (page_path: string) => {
    await trackEvent({
      event_type: 'page_view',
      page_path,
      event_data: {
        referrer: document.referrer,
        timestamp: Date.now()
      }
    })
  }, [trackEvent])

  const trackButtonClick = useCallback(async (buttonName: string, additionalData?: Record<string, any>) => {
    await trackEvent({
      event_type: 'button_click',
      page_path: window.location.pathname,
      event_data: {
        button_name: buttonName,
        ...additionalData
      }
    })
  }, [trackEvent])

  const trackWhatsAppClick = useCallback(async (message: string) => {
    await trackEvent({
      event_type: 'whatsapp_click',
      page_path: window.location.pathname,
      event_data: {
        message,
        timestamp: Date.now()
      }
    })
  }, [trackEvent])

  const trackPerformance = useCallback(async () => {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      // Web Vitals
      const performanceData: PerformanceData = {
        load_time: navigation.loadEventEnd - navigation.loadEventStart,
        first_contentful_paint: getMetricValue('first-contentful-paint'),
        largest_contentful_paint: getMetricValue('largest-contentful-paint'),
        cumulative_layout_shift: getMetricValue('cumulative-layout-shift'),
        first_input_delay: getMetricValue('first-input-delay')
      }

      await supabase.functions.invoke('analytics', {
        body: {
          page_path: window.location.pathname,
          performance_data: performanceData,
          session_id: sessionId,
          user_agent: navigator.userAgent
        }
      })

      console.log('Performance tracked:', performanceData)
    } catch (error) {
      console.error('Error tracking performance:', error)
    }
  }, [sessionId])

  const sendMetric = useCallback(async (name: string, type: 'counter' | 'gauge' | 'histogram', value: number, labels?: Record<string, any>) => {
    try {
      await supabase.functions.invoke('metrics', {
        body: {
          metric_name: name,
          metric_type: type,
          metric_value: value,
          labels: labels || {}
        }
      })
    } catch (error) {
      console.error('Error sending metric:', error)
    }
  }, [])

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackWhatsAppClick,
    trackPerformance,
    sendMetric,
    sessionId
  }
}

// Helper function para obter métricas Web Vitals
function getMetricValue(name: string): number | undefined {
  const entries = performance.getEntriesByName(name)
  if (entries.length > 0) {
    const entry = entries[entries.length - 1] as any
    return entry.value || entry.duration || entry.size || 0
  }
  return undefined
}