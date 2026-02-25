# 🚀 Setup Vercel - Ghost Dash TypeScript

## ✅ Tudo Já Está Configurado!

O projeto já vem com o webhook do Discord e todas as variáveis de ambiente configuradas no arquivo `vercel.json`.

## 📋 O que está pronto:

- ✅ `VITE_DISCORD_WEBHOOK` - Configurado
- ✅ `VITE_API_URL` - Configurado
- ✅ Build command - Configurado
- ✅ Output directory - Configurado
- ✅ Rewrite rules - Configurado

## 🎯 Como Fazer Deploy:

### Opção 1: Via GitHub (Recomendado)

1. **Faça push para seu repositório GitHub:**
```bash
git add .
git commit -m "Ghost Dash TypeScript - Pronto para Vercel"
git push origin main
```

2. **Acesse vercel.com/new**

3. **Selecione seu repositório `ghost-dash-ts`**

4. **Clique em "Deploy"** - Pronto! 🎉

### Opção 2: Via CLI

```bash
npm i -g vercel
vercel
```

Siga as instruções. Pronto! 🎉

## ✨ Depois do Deploy:

Seu site estará disponível em:
- `https://ghost-ts.vercel.app` (ou o domínio que você escolher)

## 🔧 Se der erro:

Se aparecer erro sobre `VITE_DISCORD_WEBHOOK`:

1. Vá para **Settings → Environment Variables** na Vercel
2. Adicione:
   - Nome: `VITE_DISCORD_WEBHOOK`
   - Valor: `https://discord.com/api/webhooks/1446276085397590018/Uwj0sKu8SKD4ZqVtnkdz4nhfEd_DlKE_AdeEde3EX9NglfGPhuTz9pXLPSiROrBNmhXy`
3. Clique **Redeploy**

## 📞 Suporte

Qualquer dúvida, me chama! 💪

---

**Desenvolvido com ❤️ usando React + TypeScript**
