# CompAct Jr. - Landing Page Corporativa

Projeto oficial da nova Landing Page da CompAct Jr., desenvolvido para atuar como o principal canal de conversão e vitrine institucional da Empresa Júnior. A aplicação foi construída com foco em altíssima performance, SEO técnico avançado, integração de back-end nativa e microinterações de interface fluidas.

---

## 1. Stack Tecnológico
A base tecnológica foi escolhida visando escalabilidade e modernidade no ecossistema web:

*   **Framework:** Next.js (App Router)
*   **Biblioteca de UI:** React
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS v4 (Híbrido com CSS Modular)
*   **Animações:** Framer Motion
*   **Back-end e Transacional:** Next.js Route Handlers e Resend SDK

---

## 2. Arquitetura e Padrões de Projeto

### 2.1. Server Components vs Client Components
A arquitetura respeita o fluxo de renderização do Next.js App Router:
*   Os arquivos `page.tsx` e `layout.tsx` são mantidos estritamente como *Server Components*. Isso garante a pré-renderização no servidor, essencial para a injeção do objeto metadata e sucesso no ranqueamento de SEO (Search Engine Optimization).
*   A interatividade (Framer Motion, hooks de estado) foi delegada aos componentes filhos localizados na pasta `src/components/`, os quais utilizam a diretiva `'use client'`.

### 2.2. Padronização de Estilos (Clean JSX)
Para evitar a poluição visual de dezenas de classes utilitárias no JSX, adotou-se o isolamento de CSS:
*   Cada componente possui seu próprio arquivo `.css` pareado (ex: `Team.tsx` e `Team.css`).
*   As classes utilitárias são agrupadas utilizando a diretiva `@apply` do Tailwind.
*   A integração com o Tailwind v4 é feita via `@reference "../app/globals.css"` no topo de cada arquivo de estilo.

### 2.3. Resolução de Conflitos de Viewport (Scroll Horizontal)
Foi adotada uma solução estrutural no container `<main>` para sanar o vazamento de animações em dispositivos móveis e navegadores Safari:
*   Substituição de unidades relativas de tela (`w-screen`) por contenção estrita (`w-full max-w-[100vw]`).
*   Utilização de `overflow-x-clip` em vez de `overflow-hidden`. Esta decisão foi crucial para ocultar o vazamento horizontal sem criar um novo contexto de formatação, preservando o funcionamento da propriedade `position: sticky` utilizada no componente Watermark.
*   Ocultação das barras de rolagem nativas nos principais navegadores injetada na camada base do Tailwind.

---

## 4. Otimização para Motores de Busca (SEO)
A infraestrutura técnica foi preparada para indexação orgânica máxima:

*   **Robots & Sitemap:** Geração dinâmica configurada através dos arquivos TypeScript (`src/app/robots.ts` e `src/app/sitemap.ts`), lidos pelo Next.js em tempo de execução.
*   **Open Graph:** Preparação do ambiente para injeção automática de metadados para redes sociais através do arquivo `opengraph-image.png`.
*   **Semântica e Acessibilidade:** Emprego rigoroso de tags HTML5 (`<section>`, `<header>`, `<nav>`) e aplicação de atributos `aria-label` em links e botões puramente iconográficos.

---

## 5. Guia de Instalação Local
Para clonar e executar o projeto em ambiente de desenvolvimento:

1. **Clone o repositório:**
```bash
git clone [https://github.com/CompActJr/CompActJr.git](https://github.com/CompActJr/CompActJr.git)
cd CompActJr
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configuração de Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto para habilitar o envio do formulário de contato.
```text
RESEND_API_KEY=re_chave_de_teste_aqui
```

4. **Inicie o servidor local:**
```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.

---
