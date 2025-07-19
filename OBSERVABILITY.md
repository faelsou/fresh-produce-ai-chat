# Observability Setup - Grafana & Prometheus

Este projeto implementa um sistema completo de observability com métricas Prometheus, tracking de eventos e dashboards.

## 🚀 Funcionalidades Implementadas

### 1. Coleta de Métricas
- **Page Views**: Visualizações de página com tracking de referrer
- **Button Clicks**: Cliques em botões com contexto e posição
- **WhatsApp Interactions**: Tracking de cliques no WhatsApp
- **Performance Metrics**: Web Vitals (LCP, FCP, CLS, FID)
- **Custom Metrics**: Sistema flexível para métricas personalizadas

### 2. Edge Functions
- **`/functions/v1/metrics`**: Endpoint Prometheus para exposição de métricas
- **`/functions/v1/analytics`**: API para coleta e dashboard de eventos

### 3. Database Schema
- **`metrics`**: Armazena métricas no formato Prometheus
- **`page_events`**: Eventos da landing page
- **`performance_metrics`**: Métricas de performance Web Vitals

## 📊 Configuração do Prometheus

### Prometheus Configuration (prometheus.yml)
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'findfruit-metrics'
    static_configs:
      - targets: ['deftuemtjmecwrdmvzeo.supabase.co']
    metrics_path: '/functions/v1/metrics'
    scrape_interval: 30s
    scheme: https
```

### Métricas Disponíveis
- `page_views_total`: Total de visualizações por página
- `user_sessions_total`: Total de sessões únicas
- `button_clicks_total`: Cliques em botões por tipo
- `whatsapp_clicks_total`: Interações com WhatsApp
- `performance_load_time`: Tempo de carregamento da página
- `performance_fcp`: First Contentful Paint
- `performance_lcp`: Largest Contentful Paint

## 📈 Configuração do Grafana

### 1. Adicionar Data Source
1. Acesse Grafana > Configuration > Data Sources
2. Adicione novo Prometheus data source
3. URL: `http://localhost:9090` (ou seu servidor Prometheus)
4. Teste a conexão

### 2. Queries Úteis

#### Traffic Overview
```promql
# Taxa de page views por minuto
rate(page_views_total[5m])

# Total de sessões únicas
sum(user_sessions_total)

# Page views por página
sum by (page) (page_views_total)
```

#### Performance Metrics
```promql
# Tempo médio de carregamento
avg(performance_load_time)

# P95 do First Contentful Paint
histogram_quantile(0.95, performance_fcp)

# Performance por página
avg by (page) (performance_load_time)
```

#### User Engagement
```promql
# Taxa de cliques em botões
rate(button_clicks_total[5m])

# Conversão para WhatsApp
rate(whatsapp_clicks_total[5m]) / rate(page_views_total[5m])
```

### 3. Dashboard JSON
Importe o dashboard usando o seguinte JSON:

```json
{
  "dashboard": {
    "title": "FindFruit Analytics",
    "panels": [
      {
        "title": "Page Views",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(page_views_total)",
            "legendFormat": "Total Views"
          }
        ]
      },
      {
        "title": "Traffic Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(page_views_total[5m])",
            "legendFormat": "Views/min"
          }
        ]
      },
      {
        "title": "Performance Overview",
        "type": "graph",
        "targets": [
          {
            "expr": "avg(performance_load_time)",
            "legendFormat": "Avg Load Time"
          }
        ]
      }
    ]
  }
}
```

## 🔧 URLs dos Endpoints

### Métricas Prometheus
```
GET https://deftuemtjmecwrdmvzeo.supabase.co/functions/v1/metrics
```

### Dashboard Analytics
```
GET https://deftuemtjmecwrdmvzeo.supabase.co/functions/v1/analytics?days=7
```

### Envio de Métricas Customizadas
```javascript
// Usar o hook useAnalytics
const { sendMetric } = useAnalytics();

await sendMetric('custom_metric', 'counter', 1, {
  user_type: 'premium',
  feature: 'chat'
});
```

## 📱 Tracking de Eventos

O sistema automaticamente tracked:
- Page views quando o usuário acessa qualquer página
- Cliques em botões (CTA, Demo, etc.)
- Interações com WhatsApp
- Métricas de performance (Web Vitals)

### Exemplo de Uso Manual
```javascript
import { useAnalytics } from '@/hooks/useAnalytics';

const { trackEvent, trackButtonClick } = useAnalytics();

// Event customizado
await trackEvent({
  event_type: 'feature_used',
  page_path: '/dashboard',
  event_data: { feature: 'export' }
});

// Button click
await trackButtonClick('export_data', { format: 'csv' });
```

## 🚨 Alertas Sugeridos

### Grafana Alerts
```promql
# Alta latência
avg(performance_load_time) > 3000

# Queda no tráfego
rate(page_views_total[5m]) < 0.1

# Erro rate alto
rate(error_events_total[5m]) > 0.05
```

## 📊 Métricas de Negócio

### KPIs Principais
- **Conversion Rate**: `whatsapp_clicks_total / page_views_total`
- **Engagement**: `button_clicks_total / page_views_total`
- **Performance Score**: Baseado em Web Vitals
- **Session Duration**: Calculado via eventos de página

### Dashboard Executivo
- Total de usuários únicos (últimos 30 dias)
- Taxa de conversão para WhatsApp
- Performance médio da aplicação
- Páginas mais populares
- Dispositivos e navegadores mais usados

## 🔐 Segurança

As Edge Functions são públicas para permitir coleta de métricas sem autenticação, mas implementam:
- Rate limiting implícito via Supabase
- Validação de dados de entrada
- Logs de auditoria automáticos

## 🚀 Deploy e Monitoramento

As Edge Functions são deployed automaticamente. Para monitorar:
1. Acesse o dashboard interno em `/dashboard` (criar rota se necessário)
2. Configure alertas no Grafana
3. Monitore logs via Supabase Dashboard

## 📚 Recursos Adicionais

- [Prometheus Query Language](https://prometheus.io/docs/prometheus/latest/querying/)
- [Grafana Dashboard Gallery](https://grafana.com/grafana/dashboards/)
- [Web Vitals Documentation](https://web.dev/vitals/)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)