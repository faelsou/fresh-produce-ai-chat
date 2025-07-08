
# Deploy FindFruit na VPS

## Pré-requisitos
- VPS com Ubuntu 20.04+
- Domínio apontando para o IP da VPS
- Acesso SSH à VPS

## 1. Configuração Inicial da VPS

```bash
# Executar na VPS
wget https://raw.githubusercontent.com/seu-usuario/findfruit/main/scripts/setup-vps.sh
chmod +x setup-vps.sh
./setup-vps.sh
```

## 2. Clone do Repositório

```bash
cd /opt/findfruit
git clone https://github.com/seu-usuario/findfruit.git .
```

## 3. Configuração das Variáveis

```bash
# Copiar e editar variáveis de ambiente
cp .env.production .env.local
nano .env.local
```

Edite com suas configurações reais:
- `VITE_WHATSAPP_NUMBER`: Seu número do WhatsApp
- `DOCKER_USERNAME`: Seu usuário do Docker Hub

## 4. Configuração do Nginx

```bash
# Copiar configuração do Nginx
sudo cp nginx-vps.conf /etc/nginx/sites-available/findfruit
sudo ln -s /etc/nginx/sites-available/findfruit /etc/nginx/sites-enabled/

# Substituir 'seudominio.com' pelo seu domínio real
sudo sed -i 's/seudominio.com/SEUDOMINIO.com/g' /etc/nginx/sites-enabled/findfruit

# Testar e recarregar Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Configurar SSL (HTTPS)

```bash
# Obter certificado SSL gratuito
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

## 6. Deploy da Aplicação

```bash
# Executar deploy
chmod +x scripts/deploy-vps.sh
./scripts/deploy-vps.sh
```

## 7. Monitoramento

```bash
# Ver logs da aplicação
docker-compose -f docker-compose.prod.yml logs -f

# Verificar status
docker-compose -f docker-compose.prod.yml ps
```

## Comandos Úteis

```bash
# Reiniciar aplicação
docker-compose -f docker-compose.prod.yml restart

# Parar aplicação
docker-compose -f docker-compose.prod.yml down

# Atualizar aplicação
git pull && ./scripts/deploy-vps.sh
```

## Troubleshooting

### Problema: Site não carrega
```bash
# Verificar se containers estão rodando
docker ps

# Verificar logs
docker-compose -f docker-compose.prod.yml logs
```

### Problema: SSL não funciona
```bash
# Renovar certificado
sudo certbot renew --dry-run
```

### Problema: Nginx erro 502
```bash
# Verificar se aplicação está rodando na porta 3000
curl http://localhost:3000
```
