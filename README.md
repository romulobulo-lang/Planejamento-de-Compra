# Planejador de Compras de Tecnologia (PWA)

Este projeto é um Progressive Web App (PWA) simples para planejar compras de hardware (setup Intel i5-13400). Ele funciona offline via Service Worker e contém um `manifest.json` para instalação no celular.

## O que tem aqui

- `index.html` — aplicação web principal
- `manifest.json` — configurações do PWA (nome, ícones, start_url, display)
- `sw.js` — service worker básico para cache offline
- `icons/icon-192.jpeg`, `icons/icon-512.jpeg` — ícones usados pelo PWA

## Passos rápidos para testar localmente

1. Abra o `index.html` diretamente no navegador (Chrome/Edge recomendados) para testar a UI.
2. Para testar o service worker e funcionalidades de PWA localmente, use um servidor local simples. No PowerShell você pode rodar um servidor rápido com Python 3:

```powershell
# a partir da pasta do projeto
python -m http.server 5500
```

Depois abra http://localhost:5500 no Chrome/Edge e abra DevTools (F12) > Application para checar Manifest e Service Worker.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e suba os arquivos (commit + push).
2. No repositório vá em Settings > Pages e escolha a branch `main` (ou `master`) e a pasta `/ (root)` como fonte.
3. Salve. Em alguns minutos sua página estará disponível em `https://<seu-usuario>.github.io/<nome-do-repo>/`.

Dica: se estiver publicando em um subdiretório (GitHub Pages padrão), verifique que `manifest.json` e `sw.js` usem caminhos relativos (estão configurados como `index.html` e `manifest.json`).

## Notas importantes e recomendações

- O `manifest.json` foi ajustado para usar os ícones `.jpeg` que existem na pasta `icons/`.
- O `start_url` foi corrigido para `"index.html"`.
- O `sw.js` usa caminhos relativos para cache (`index.html`, `manifest.json`). Recomendo adicionar também os ícones ao cache e um fallback offline (por ex. `offline.html`) para uma melhor experiência.
- Teste a instalação no celular: abra o site no Chrome mobile (ou emulador), abra DevTools → Application → Manifest e verifique se o navegador sugere "Add to Home Screen" ou use o menu do Chrome "Adicionar à tela inicial".

## Melhores práticas (opcionais)

- Incluir uma página `offline.html` como fallback e adicioná-la ao cache do `sw.js`.
- Versionar o cache (`CACHE_NAME`) e implementar estratégia de atualização (Cache then Network / stale-while-revalidate).
- Gerar ícones PNG nas resoluções recomendadas (PNG é mais comum), mas JPEG funciona também.

## Conteúdo do manifesto atual

Confira `manifest.json` para ver as configurações básicas (nome, ícones, display = `standalone`).

---

Se quiser, eu posso:
- Adicionar `offline.html` e ajustar `sw.js` para um fallback.
- Incluir os ícones no cache do `sw.js`.
- Preparar um `.gitignore` e o commit inicial pronto para você dar `git push`.

Qual desses devo fazer a seguir?