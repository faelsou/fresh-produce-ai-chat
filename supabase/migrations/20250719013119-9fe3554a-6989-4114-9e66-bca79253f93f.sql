-- Criar tabela para métricas de observability
CREATE TABLE public.metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name text NOT NULL,
  metric_type text NOT NULL CHECK (metric_type IN ('counter', 'gauge', 'histogram')),
  metric_value numeric NOT NULL DEFAULT 0,
  labels jsonb DEFAULT '{}',
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Criar tabela para eventos da landing page
CREATE TABLE public.page_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  page_path text NOT NULL,
  user_agent text,
  ip_address inet,
  session_id text,
  user_id uuid,
  event_data jsonb DEFAULT '{}',
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Criar tabela para métricas de performance
CREATE TABLE public.performance_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path text NOT NULL,
  load_time numeric,
  first_contentful_paint numeric,
  largest_contentful_paint numeric,
  cumulative_layout_shift numeric,
  first_input_delay numeric,
  session_id text,
  user_agent text,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_metrics_name_timestamp ON public.metrics(metric_name, timestamp);
CREATE INDEX idx_page_events_type_timestamp ON public.page_events(event_type, timestamp);
CREATE INDEX idx_performance_path_timestamp ON public.performance_metrics(page_path, timestamp);

-- Habilitar RLS
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permitir acesso público para métricas)
CREATE POLICY "Public access to metrics" ON public.metrics FOR ALL USING (true);
CREATE POLICY "Public access to page events" ON public.page_events FOR ALL USING (true);
CREATE POLICY "Public access to performance metrics" ON public.performance_metrics FOR ALL USING (true);