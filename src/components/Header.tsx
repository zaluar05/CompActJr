'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import './styles/Header.css'

/**
 * COMPONENTE HEADER (Navegação Principal)
 * @description O cabeçalho do site. Ele é responsivo, possui fundo dinâmico (transparente no topo, sólido ao rolar) e um menu mobile customizado.
 * @kayualins - Equipe de Projetos CompAct Jr.
 */
export default function Header() {
    // ESTADOS DO COMPONENTE
    // 'rolou': Controla se o usuário desceu a página (muda a cor do header)
    const [rolou, setRolou] = useState(false)
    // 'menuAberto': Controla o estado de visibilidade do menu de celular (Overlay)
    const [menuAberto, setMenuAberto] = useState(false)
    // 'isDark': Estado inicial para o sistema de mudança de temas (Dark/Light mode)
    const [isDark, setIsDark] = useState(true)

    // Lê a variável de ambiente para controlar exibição do link do PS
    const psAtivo = process.env.NEXT_PUBLIC_ATIVAR_PAGINA_PS === 'true'

    // EFEITOS COLATERAIS (Lógica de Tela)
    useEffect(() => {
        // Monitora a posição do Scroll da janela. Se passar de 20px, ativa o background escuro.
        const monitorarScroll = () => setRolou(window.scrollY > 20)
        window.addEventListener('scroll', monitorarScroll)
        // Cleanup: Remove o "escutador" quando o componente for destruído, evitando vazamento de memória.
        return () => window.removeEventListener('scroll', monitorarScroll)
    }, [])

    return (
        <>
            {/* ESTRUTURA PRINCIPAL DO HEADER */}
            <header className={`header-container ${rolou ? 'header-scroll-active' : 'header-scroll-inactive'}`}>

                {/* LÓGICA DE GRID RESPONSIVA:
                    Mobile (< 1024px): 'grid grid-cols-3' -> Divide em 3 partes para centralizar a logo.
                    Desktop (>= 1024px): 'lg:flex lg:justify-between' -> Volta ao alinhamento lateral padrão. */}
                <div className="container mx-auto px-6 max-w-7xl h-full grid grid-cols-3 items-center lg:flex lg:justify-between">

                    {/* COLUNA 1: NAVEGAÇÃO ESQUERDA (DESKTOP) */}
                    {/* 'shrink-0' impede que os links sejam "esmagados" quando a tela diminui */}
                    <nav className="hidden lg:flex items-center lg:gap-6 xl:gap-10 lg:w-[45%] xl:w-[40%] justify-end shrink-0">
                        <Link href="#hero" className="nav-link">Homepage</Link>
                        <Link href="#servicos" className="nav-link">Serviços</Link>
                    </nav>

                    {/* COLUNA 2: LOGO CENTRAL */}
                    {/* 'col-start-2' força a logo para o meio exato do grid na versão mobile */}
                    <div className="flex justify-center items-center col-start-2 lg:col-auto lg:px-2 xl:px-10 z-[70] shrink-0">
                        <Link href="/" className="relative block">
                            <Image
                                src="/logos/logo-compact.webp"
                                alt="CompAct Jr. Logo"
                                width={50}
                                height={40}
                                priority // 'priority' faz a logo carregar imediatamente, melhorando o LCP (SEO)
                                style={{ width: 'auto', height: 'auto' }}
                                className="object-contain logo-img"
                            />
                        </Link>
                    </div>

                    {/* COLUNA 3: NAVEGAÇÃO DIREITA E AÇÕES (DESKTOP) */}
                    <div className="hidden lg:flex items-center lg:gap-5 xl:gap-10 lg:w-[45%] xl:w-[40%] justify-start shrink-0">
                        <nav className="flex items-center lg:gap-4 xl:gap-8">
                            <Link href="#sobre" className="nav-link ">Quem Somos</Link>
                            {/*<Link href="#blog" className="nav-link ">Blog</Link>*/}
                            <Link href="#portfolio" className="nav-link ">Portfólio</Link>
                           
                            {psAtivo && (
                                <Link href="/processoSeletivo" id="nav-processo-seletivo">
                                    <button className="btn-contato">PS 2026/2</button>
                                </Link>
                            )}
                            
                        </nav>

                        {/* Divisor vertical sutil ('border-l') separando os links dos botões de ação */}
                        <div className="flex items-center lg:gap-3 xl:gap-6 border-l border-branco/10 lg:pl-3 xl:pl-6 shrink-0">
                            <Link href="#contato">
                                <button className="btn-contato">CONTATO</button>
                            </Link>

                            {/* Ícones Auxiliares: SVGs são usados por serem mais leves que fontes de ícones */}
                            <div className="header-extra-icons">
                                {/* Funcionalidade futura: Botão de Idioma
                                <button className="icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                </button>
                                */}

                                {/* Funcionalidade futura: Botão de Tema com Animação (Framer Motion)
                                <motion.button
                                    onClick={() => setIsDark(!isDark)}
                                    className="icon-btn hover:scale-110 transition-transform"
                                    aria-label="Alternar Tema"
                                    whileTap={{ rotate: 90 }} // Gira o ícone ao clicar
                                >
                                    {isDark ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                                    )}
                                </motion.button>
                                */}
                            </div>
                        </div>
                    </div>

                    {/* BOTÃO HAMBURGUER (MOBILE) */}
                    {/* 'lg:hidden' garante que suma no desktop. 'col-start-3' o joga para o canto direito da grid. */}
                    <div className="lg:hidden flex items-center justify-end col-start-3 z-[100]">
                        <div className={`menu-burger ${menuAberto ? 'burger-open' : ''}`} onClick={() => setMenuAberto(!menuAberto)}>
                            <span className="burger-line line-1"></span>
                            <span className="burger-line line-2"></span>
                            <span className="burger-line line-3"></span>
                        </div>
                    </div>

                </div>
            </header>

            <div className={`mobile-menu-overlay ${menuAberto ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

                {/* Botão "X" grande no canto superior direito para facilitar fechamento (Melhoria de UX) */}
                <button
                    onClick={() => setMenuAberto(false)}
                    className="absolute top-8 right-6 text-branco/50 hover:text-secundaria transition-colors p-2 cursor-pointer z-[100]"
                    aria-label="Fechar menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>

                {/* Lista de Links Mobile (Maior espaçamento para toques 'Touch Target') */}
                <nav className="flex flex-col items-center gap-8 mt-10">
                    <Link href="/" onClick={() => setMenuAberto(false)} className="nav-link nav-link-mobile text-secundaria">Homepage</Link>
                    <Link href="#servicos" onClick={() => setMenuAberto(false)} className="nav-link nav-link-mobile">Serviços</Link>
                    <Link href="#sobre" onClick={() => setMenuAberto(false)} className="nav-link nav-link-mobile">Quem Somos</Link>
                    <Link href="#portfolio" onClick={() => setMenuAberto(false)} className="nav-link nav-link-mobile">Portfólio</Link>
                 
                    {psAtivo && (
                        <Link
                            href="/processoSeletivo"
                            onClick={() => setMenuAberto(false)}
                            className="font-principal text-2xl uppercase tracking-[5px] text-secundaria border border-secundaria/40 px-6 py-2 hover:bg-secundaria hover:text-preto hover:border-secundaria transition-all duration-300"
                            id="mobile-nav-processo-seletivo"
                        >
                            PS 2026/2
                        </Link>
                    )}


                    <Link href="#contato" onClick={() => setMenuAberto(false)}>
                        <button className="btn-contato text-lg px-12 py-4 mt-2">CONTATO</button>
                    </Link>
                </nav>
            </div>
        </>
    )
}