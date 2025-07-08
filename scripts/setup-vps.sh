
#!/bin/bash

# Script de configuração inicial da VPS para FindFruit
set -e

echo "🚀 Configurando VPS para FindFruit..."

# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalar Nginx (para proxy reverso)
sudo apt install nginx -y

# Instalar Certbot para SSL
sudo apt install certbot python3-certbot-nginx -y

# Criar diretório do projeto
sudo mkdir -p /opt/findfruit
sudo chown $USER:$USER /opt/findfruit

# Configurar firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ VPS configurada com sucesso!"
echo "📝 Próximos passos:"
echo "1. Clone o repositório em /opt/findfruit"
echo "2. Configure as variáveis de ambiente"
echo "3. Execute o script de deploy"
echo "4. Configure o SSL com: sudo certbot --nginx -d seudominio.com"
