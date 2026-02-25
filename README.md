# Ghost Dash TypeScript - Gerador de Chaves API

Um dashboard moderno e responsivo para gerenciamento de chaves API, construído com **React 19**, **TypeScript**, **Tailwind CSS** e **Vite**.

## 🚀 Características

- ✅ **100% TypeScript** - Type-safe em toda a aplicação
- ✅ **React 19** - Últimas features e performance
- ✅ **Tailwind CSS 4** - Estilização moderna e responsiva
- ✅ **Vite** - Build rápido e otimizado
- ✅ **Suporte Multilíngue** - Português, Inglês e Vietnamita
- ✅ **Gerenciamento de Estado** - Context API com localStorage
- ✅ **Componentes Reutilizáveis** - Arquitetura modular
- ✅ **Pronto para Vercel** - Deploy em 1 clique

## 📋 Estrutura do Projeto

```
ghost-dash-ts/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   ├── contexts/        # React Context (AppContext)
│   │   ├── lib/
│   │   │   ├── constants.ts # Constantes da aplicação
│   │   │   ├── i18n.ts      # Traduções multilíngues
│   │   │   └── utils.ts     # Funções utilitárias
│   │   ├── pages/           # Páginas (Home, Keys, Devices, etc)
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Componente principal
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   └── index.html           # HTML template
├── server/                  # Backend placeholder (estático)
├── package.json             # Dependências
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
└── tailwind.config.ts       # Configuração Tailwind
```

## 🛠️ Instalação Local

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Passos

1. **Clone ou extraia o projeto**
```bash
cd ghost-dash-ts
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
# ou
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

## 📦 Build para Produção

```bash
pnpm build
# ou
npm run build
```

Os arquivos otimizados estarão em `dist/`.

## 🚀 Deploy na Vercel

### Opção 1: Via CLI (Recomendado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça deploy
vercel
```

### Opção 2: Via GitHub

1. **Faça push do projeto para GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/ghost-dash-ts.git
git push -u origin main
```

2. **Acesse [vercel.com](https://vercel.com)**
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Configure as variáveis de ambiente (se necessário)
   - Clique em "Deploy"

### Opção 3: Drag & Drop

1. Faça o build local: `pnpm build`
2. Acesse [vercel.com](https://vercel.com/new)
3. Arraste a pasta `dist/` para fazer upload

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_DISCORD_WEBHOOK=https://discord.com/api/webhooks/seu-webhook
VITE_API_URL=https://sua-api.com
```

## 📱 Páginas Disponíveis

| Página | Descrição |
|--------|-----------|
| **Home** | Dashboard principal com estatísticas |
| **Keys** | Gerenciamento de chaves API |
| **Devices** | Histórico de dispositivos/sessões |
| **Packages** | Gerenciamento de pacotes/destinos |
| **Profile** | Configurações e suporte |

## 🎨 Personalizações

### Alterar Cores

Edite `client/src/index.css` e modifique as variáveis CSS:

```css
:root {
  --primary: #1a56e8;  /* Cor primária */
  --destructive: #ef4444;  /* Cor de erro */
  /* ... outras cores */
}
```

### Adicionar Idiomas

Edite `client/src/lib/i18n.ts` e adicione novas traduções no objeto `translations`.

### Modificar Componentes

Todos os componentes estão em `client/src/components/` e são totalmente customizáveis com Tailwind CSS.

## 🔧 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build para produção
pnpm preview      # Preview do build
pnpm check        # Verifica tipos TypeScript
pnpm format       # Formata código com Prettier
```

## 📚 Tecnologias Utilizadas

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Vite** - Build tool
- **Lucide React** - Ícones
- **Wouter** - Roteamento leve
- **Sonner** - Notificações toast
- **shadcn/ui** - Componentes UI

## 🔐 Segurança

- ✅ Todas as chaves são armazenadas localmente (localStorage)
- ✅ Sem exposição de dados sensíveis no código
- ✅ Suporte a HTTPS por padrão na Vercel
- ✅ CSP headers configuráveis

## 🐛 Troubleshooting

### Porta 5173 já está em uso
```bash
pnpm dev -- --port 3000
```

### Erro de build
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Variáveis de ambiente não funcionam
- Certifique-se de usar prefixo `VITE_` para variáveis do cliente
- Reinicie o servidor de desenvolvimento após adicionar `.env.local`

## 📝 Licença

MIT

## 🤝 Contribuindo

Sinta-se livre para fazer fork, criar branches e enviar pull requests!

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando React + TypeScript**
