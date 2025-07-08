
#!/bin/bash

# Script de deploy para VPS
set -e

echo "🚀 Iniciando deploy na VPS..."

# Ir para diretório do projeto
cd /opt/findfruit

# Fazer backup do container atual (se existir)
if [ "$(docker ps -q -f name=findfruit)" ]; then
    echo "📦 Fazendo backup do container atual..."
    docker stop findfruit || true
    docker rename findfruit findfruit-backup-$(date +%Y%m%d-%H%M%S) || true
fi

# Atualizar código
echo "📥 Atualizando código..."
git pull origin main

# Carregar variáveis de ambiente
if [ -f .env.production ]; then
    export $(cat .env.production | xargs)
fi

# Build e deploy
echo "🔨 Construindo e fazendo deploy..."
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Verificar se está rodando
sleep 10
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Deploy realizado com sucesso!"
    
    # Remover containers antigos
    docker container prune -f
    docker image prune -f
    
    echo "🌐 Site disponível em: https://seudominio.com"
else
    echo "❌ Erro no deploy - verificar logs:"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi
