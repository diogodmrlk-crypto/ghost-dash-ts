# 🚀 Guia Completo de Deploy na Vercel

## Pré-requisitos

- Conta na [Vercel](https://vercel.com) (gratuita)
- Git instalado localmente
- Node.js 18+

## Método 1: Deploy via GitHub (Recomendado)

### Passo 1: Prepare o repositório local

```bash
cd ghost-dash-ts
git init
git add .
git commit -m "Initial commit: Ghost Dash TypeScript"
git branch -M main
```

### Passo 2: Crie um repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Crie um novo repositório chamado `ghost-dash-ts`
3. **NÃO** inicialize com README (já temos um)

### Passo 3: Faça push do código

```bash
git remote add origin https://github.com/SEU_USUARIO/ghost-dash-ts.git
git push -u origin main
```

### Passo 4: Deploy na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em "Continue with GitHub"
3. Selecione o repositório `ghost-dash-ts`
4. Configure as variáveis de ambiente (opcional):
   - `VITE_DISCORD_WEBHOOK`: URL do webhook do Discord
   - `VITE_API_URL`: URL da sua API
5. Clique em "Deploy"

**Pronto!** Sua aplicação estará disponível em `https://ghost-dash-ts.vercel.app`

---

## Método 2: Deploy via CLI

### Passo 1: Instale a CLI da Vercel

```bash
npm i -g vercel
```

### Passo 2: Faça login

```bash
vercel login
```

### Passo 3: Deploy

```bash
vercel
```

Siga as instruções no terminal. A aplicação será deployada automaticamente.

---

## Método 3: Deploy via Drag & Drop

### Passo 1: Faça o build

```bash
pnpm install
pnpm build
```

### Passo 2: Upload

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Arraste a pasta `dist/` para a área de upload
3. Aguarde o deploy

---

## ✅ Verificação Pós-Deploy

Após o deploy, verifique:

- [ ] A aplicação carrega sem erros
- [ ] As páginas navegam corretamente
- [ ] Os estilos estão aplicados
- [ ] As traduções funcionam
- [ ] O localStorage persiste dados

---

## 🔧 Variáveis de Ambiente

Se você tiver variáveis de ambiente, configure-as na Vercel:

1. Vá para "Settings" → "Environment Variables"
2. Adicione cada variável:
   - `VITE_DISCORD_WEBHOOK`
   - `VITE_API_URL`
3. Clique em "Save"
4. Faça redeploy

---

## 🐛 Troubleshooting

### Erro: "Build failed"

```bash
# Limpe o cache local e tente novamente
rm -rf node_modules .next dist
pnpm install
pnpm build
```

### Erro: "Module not found"

Certifique-se de que todos os imports usam paths corretos:
- ✅ `import { Component } from '@/components/...'`
- ❌ `import { Component } from '../components/...'`

### Página em branco após deploy

1. Verifique o console do navegador (F12)
2. Verifique os logs na Vercel: "Deployments" → "Logs"
3. Certifique-se de que `dist/index.html` existe

---

## 🔄 Updates Futuros

Para fazer updates:

```bash
# Faça as alterações
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

A Vercel fará redeploy automaticamente!

---

## 📊 Monitoramento

Na dashboard da Vercel você pode:

- Ver logs de build
- Monitorar performance
- Gerenciar domínios customizados
- Configurar CI/CD

---

## 🎉 Sucesso!

Sua aplicação Ghost Dash está agora online e acessível globalmente!

Para mais informações, visite [vercel.com/docs](https://vercel.com/docs)
