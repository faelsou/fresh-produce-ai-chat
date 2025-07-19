import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    if (req.method === 'POST') {
      const body = await req.json()
      const { 
        event_type, 
        page_path, 
        user_agent, 
        ip_address, 
        session_id, 
        event_data,
        performance_data 
      } = body

      // Salvar evento da página
      if (event_type && page_path) {
        const { error: eventError } = await supabase
          .from('page_events')
          .insert([{
            event_type,
            page_path,
            user_agent,
            ip_address,
            session_id,
            event_data: event_data || {}
          }])

        if (eventError) {
          console.error('Event error:', eventError)
        }
      }

      // Salvar métricas de performance
      if (performance_data && page_path) {
        const { error: perfError } = await supabase
          .from('performance_metrics')
          .insert([{
            page_path,
            load_time: performance_data.load_time,
            first_contentful_paint: performance_data.first_contentful_paint,
            largest_contentful_paint: performance_data.largest_contentful_paint,
            cumulative_layout_shift: performance_data.cumulative_layout_shift,
            first_input_delay: performance_data.first_input_delay,
            session_id,
            user_agent
          }])

        if (perfError) {
          console.error('Performance error:', perfError)
        }
      }

      // Atualizar contadores de métricas
      const counters = [
        { name: 'page_views_total', type: 'counter', value: 1, labels: { page: page_path, event: event_type } },
        { name: 'user_sessions_total', type: 'counter', value: 1, labels: { session_id } }
      ]

      for (const counter of counters) {
        await supabase
          .from('metrics')
          .insert([{
            metric_name: counter.name,
            metric_type: counter.type,
            metric_value: counter.value,
            labels: counter.labels
          }])
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (req.method === 'GET') {
      // Dashboard de analytics
      const { searchParams } = new URL(req.url)
      const days = parseInt(searchParams.get('days') || '7')
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

      const [eventsResult, metricsResult, performanceResult] = await Promise.all([
        supabase
          .from('page_events')
          .select('*')
          .gte('timestamp', startDate)
          .order('timestamp', { ascending: false }),
        
        supabase
          .from('metrics')
          .select('*')
          .gte('timestamp', startDate)
          .order('timestamp', { ascending: false }),
        
        supabase
          .from('performance_metrics')
          .select('*')
          .gte('timestamp', startDate)
          .order('timestamp', { ascending: false })
      ])

      const dashboard = {
        events: eventsResult.data || [],
        metrics: metricsResult.data || [],
        performance: performanceResult.data || [],
        summary: {
          total_events: eventsResult.data?.length || 0,
          unique_sessions: new Set(eventsResult.data?.map(e => e.session_id)).size,
          avg_load_time: performanceResult.data?.reduce((acc, p) => acc + (p.load_time || 0), 0) / (performanceResult.data?.length || 1)
        }
      }

      return new Response(JSON.stringify(dashboard), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})