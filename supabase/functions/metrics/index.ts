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

    if (req.method === 'GET') {
      // Exportar métricas no formato Prometheus
      const { data: metrics, error } = await supabase
        .from('metrics')
        .select('*')
        .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // últimas 24h

      if (error) throw error

      // Converter para formato Prometheus
      let prometheusOutput = ''
      
      const metricGroups = new Map()
      
      metrics.forEach(metric => {
        const key = `${metric.metric_name}_${metric.metric_type}`
        if (!metricGroups.has(key)) {
          metricGroups.set(key, [])
        }
        metricGroups.get(key).push(metric)
      })

      metricGroups.forEach((metricList, key) => {
        const firstMetric = metricList[0]
        prometheusOutput += `# HELP ${firstMetric.metric_name} ${firstMetric.metric_name} metric\n`
        prometheusOutput += `# TYPE ${firstMetric.metric_name} ${firstMetric.metric_type}\n`
        
        metricList.forEach(metric => {
          const labels = Object.entries(metric.labels || {})
            .map(([k, v]) => `${k}="${v}"`)
            .join(',')
          
          const labelStr = labels ? `{${labels}}` : ''
          prometheusOutput += `${metric.metric_name}${labelStr} ${metric.metric_value} ${new Date(metric.timestamp).getTime()}\n`
        })
        prometheusOutput += '\n'
      })

      return new Response(prometheusOutput, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain; version=0.0.4'
        }
      })
    }

    if (req.method === 'POST') {
      // Receber e armazenar métricas
      const body = await req.json()
      const { metric_name, metric_type, metric_value, labels } = body

      const { error } = await supabase
        .from('metrics')
        .insert([{
          metric_name,
          metric_type,
          metric_value,
          labels: labels || {}
        }])

      if (error) throw error

      return new Response(JSON.stringify({ success: true }), {
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