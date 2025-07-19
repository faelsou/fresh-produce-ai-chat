import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardData {
  events: any[];
  metrics: any[];
  performance: any[];
  summary: {
    total_events: number;
    unique_sessions: number;
    avg_load_time: number;
  };
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: analyticsData } = await supabase.functions.invoke('analytics', {
        body: { days }
      });
      setData(analyticsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Erro ao carregar dados</div>
      </div>
    );
  }

  // Processar dados para gráficos
  const eventsByType = data.events.reduce((acc, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {});

  const eventTypeData = Object.entries(eventsByType).map(([name, value]) => ({
    name,
    value
  }));

  const dailyEvents = data.events.reduce((acc, event) => {
    const date = new Date(event.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dailyEventData = Object.entries(dailyEvents).map(([date, count]) => ({
    date,
    events: count
  }));

  const avgPerformance = {
    load_time: data.performance.reduce((acc, p) => acc + (p.load_time || 0), 0) / (data.performance.length || 1),
    fcp: data.performance.reduce((acc, p) => acc + (p.first_contentful_paint || 0), 0) / (data.performance.length || 1),
    lcp: data.performance.reduce((acc, p) => acc + (p.largest_contentful_paint || 0), 0) / (data.performance.length || 1)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard de Observability</h1>
        <div className="space-x-2">
          <Button
            variant={days === 1 ? "default" : "outline"}
            onClick={() => setDays(1)}
          >
            1 Dia
          </Button>
          <Button
            variant={days === 7 ? "default" : "outline"}
            onClick={() => setDays(7)}
          >
            7 Dias
          </Button>
          <Button
            variant={days === 30 ? "default" : "outline"}
            onClick={() => setDays(30)}
          >
            30 Dias
          </Button>
        </div>
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Eventos</CardTitle>
            <CardDescription>Últimos {days} dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.total_events}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sessões Únicas</CardTitle>
            <CardDescription>Usuários únicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.unique_sessions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tempo de Carregamento</CardTitle>
            <CardDescription>Média em ms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgPerformance.load_time)}ms</div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Eventos por Tipo</CardTitle>
            <CardDescription>Distribuição dos tipos de eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos Diários</CardTitle>
            <CardDescription>Atividade ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyEventData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="events" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
            <CardDescription>Web Vitals médios</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Load Time', value: avgPerformance.load_time },
                { name: 'FCP', value: avgPerformance.fcp },
                { name: 'LCP', value: avgPerformance.lcp }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links Úteis</CardTitle>
            <CardDescription>Ferramentas de observability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <strong>Métricas Prometheus:</strong>
              <br />
              <code className="bg-muted p-1 rounded text-xs">
                GET https://deftuemtjmecwrdmvzeo.supabase.co/functions/v1/metrics
              </code>
            </div>
            <div className="text-sm">
              <strong>Configuração Grafana:</strong>
              <br />
              <span className="text-xs text-muted-foreground">
                Configure o Grafana para apontar para o endpoint acima
              </span>
            </div>
            <div className="text-sm">
              <strong>Prometheus Query Examples:</strong>
              <br />
              <code className="bg-muted p-1 rounded text-xs block mt-1">
                rate(page_views_total[5m])
              </code>
              <code className="bg-muted p-1 rounded text-xs block mt-1">
                user_sessions_total
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};