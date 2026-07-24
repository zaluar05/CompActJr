'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import './styles/ProcessoSeletivo.css'

/**
 * COMPONENTE PROCESSO SELETIVO
 * @description Página completa do PS com contagem regressiva, formulário de inscrição (Pipefy),
 * edital e contato com a Gerência de Pessoas.
 * Lê as variáveis de ambiente NEXT_PUBLIC_ para URLs e e-mail.
 * @kayualins - Equipe de Projetos CompAct Jr.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface TimeLeft {
    dias: number
    horas: number
    minutos: number
    segundos: number
    total: number
}

// ─── Datas do PS 2026/2 ──────────────────────────────────────────────────────
// Ajuste estas constantes conforme o edital oficial do PS 2026/2
// as datas tem a seguinte formatação: YYYY-MM-DDTHH:mm:ss-HH:mm tem o offset de -3 por causa de fuso-horarios
const DATA_ABERTURA_INSCRICOES = new Date('2026-07-26T00:00:00-03:00')
const DATA_ENCERRAMENTO_INSCRICOES = new Date('2026-08-16T23:59:00-00:00')

// ─── Utilitário: calcula tempo restante ──────────────────────────────────────
function calcularTempoRestante(alvo: Date): TimeLeft {
    const total = alvo.getTime() - Date.now()
    if (total <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0, total: 0 }
    return {
        total,
        dias: Math.floor(total / (1000 * 60 * 60 * 24)),
        horas: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((total / 1000 / 60) % 60),
        segundos: Math.floor((total / 1000) % 60),
    }
}

// ─── Sub-componente: Unidade do Timer ────────────────────────────────────────
function TimerUnit({ value, label, highlight = false }: { value: number; label: string; highlight?: boolean }) {
    return (
        <div className="ps-timer-unit">
            <span className={`ps-timer-number ${highlight ? 'highlight' : ''}`}>
                {String(value).padStart(2, '0')}
            </span>
            <span className="ps-timer-label">{label}</span>
        </div>
    )
}

// ─── Sub-componente: Card de Contagem Regressiva ─────────────────────────────
function CountdownCard({
    titulo,
    label,
    alvo,
    cor,
    statusAberto,
    statusFechado,
    statusAtivado,
    delay = 0,
}: {
    titulo: string
    label: string
    alvo: Date
    cor: string
    statusAberto: string
    statusFechado: string
    statusAtivado: string
    delay?: number
}) {
    const [tempo, setTempo] = useState<TimeLeft>(calcularTempoRestante(alvo))
    const agora = Date.now()
    const jaPasso = alvo.getTime() < agora
    const isAtivo = !jaPasso && Date.now() >= DATA_ABERTURA_INSCRICOES.getTime()

    useEffect(() => {
        if (jaPasso) return
        const id = setInterval(() => setTempo(calcularTempoRestante(alvo)), 1000)
        return () => clearInterval(id)
    }, [alvo, jaPasso])

    const getStatusClass = () => {
        if (jaPasso) return 'closed'
        if (isAtivo) return 'open'
        return 'waiting'
    }

    const getStatusText = () => {
        if (jaPasso) return statusFechado
        if (isAtivo) return statusAtivado
        return statusAberto
    }

    return (
        <motion.div
            className="ps-countdown-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        >
            {/* Glow de fundo decorativo */}
            <div
                className="ps-countdown-card-glow"
                style={{ background: `radial-gradient(circle, ${cor} 0%, transparent 70%)` }}
            />

            <p className="ps-countdown-card-label">{label}</p>
            <h3 className={`ps-countdown-card-title ${isAtivo && !jaPasso ? 'active' : ''}`}>{titulo}</h3>

            {jaPasso ? (
                <p className="font-titulo text-2xl font-bold text-branco/40 uppercase tracking-widest">
                    Encerrado
                </p>
            ) : (
                <div className="ps-timer-grid">
                    <TimerUnit value={tempo.dias} label="Dias" highlight={isAtivo} />
                    <span className="ps-timer-separator">:</span>
                    <TimerUnit value={tempo.horas} label="Horas" highlight={isAtivo} />
                    <span className="ps-timer-separator">:</span>
                    <TimerUnit value={tempo.minutos} label="Min" highlight={isAtivo} />
                    <span className="ps-timer-separator">:</span>
                    <TimerUnit value={tempo.segundos} label="Seg" highlight={isAtivo} />
                </div>
            )}

            <div className="ps-countdown-status">
                <span className={`ps-status-dot ${getStatusClass()}`} />
                <span className="ps-status-text">{getStatusText()}</span>
            </div>
        </motion.div>
    )
}

// ─── Ícones SVG ──────────────────────────────────────────────────────────────
const IconEdital = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
)
const IconRequisitos = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
)
const IconCalendario = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)
const IconMail = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)
const IconArrow = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)
const IconDownload = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function ProcessoSeletivo() {
    const gpEmail = process.env.NEXT_PUBLIC_GP_EMAIL ?? 'gp@compactjr.com'
    const pipefyUrl = process.env.NEXT_PUBLIC_PIPEFY_URL ?? ''

    const agora = Date.now()
    const inscricoesAbertas =
        agora >= DATA_ABERTURA_INSCRICOES.getTime() &&
        agora <= DATA_ENCERRAMENTO_INSCRICOES.getTime()
    const inscricoesEncerradas = agora > DATA_ENCERRAMENTO_INSCRICOES.getTime()

    // Animação de entrada em cascata (stagger)
    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: 'easeOut' as const },
    })

    return (
        <>
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section id="processo-seletivo" className="ps-hero">
                <div className="ps-hero-glow-purple" />
                <div className="ps-hero-glow-blue" />

                <div className="ps-hero-content">
                    <motion.div {...fadeUp(0)}>
                        <span className="ps-kicker">CompAct Jr. · PS 2026/2</span>
                    </motion.div>

                    <motion.h1 className="ps-hero-title" {...fadeUp(0.1)}>
                        Processo<br />
                        <span>Seletivo</span><br />
                        2026/2
                    </motion.h1>

                    <motion.p className="ps-hero-subtitle" {...fadeUp(0.2)}>
                        Faça parte de uma ótima empresa júnior de TI do Rio Grande do Sul.
                        Desenvolva habilidades reais, conecte-se com pessoas incríveis e
                        impacte a sociedade com tecnologia.
                    </motion.p>

                    <motion.div {...fadeUp(0.3)}>
                        <Link href="#inscricao">
                            <button
                                id="ps-hero-cta"
                                className={`ps-inscricao-btn ${inscricoesEncerradas ? 'disabled' : ''}`}
                                disabled={inscricoesEncerradas}
                            >
                                {inscricoesEncerradas
                                    ? 'Inscrições encerradas'
                                    : inscricoesAbertas
                                        ? 'Inscreva-se agora'
                                        : 'Em breve — saiba mais'}
                                {!inscricoesEncerradas}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── CONTAGENS REGRESSIVAS ─────────────────────────────────────── */}
            <section id="countdown" className="ps-countdown-wrapper">
                <div className="ps-section-header">
                    <motion.span
                        className="ps-section-kicker"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Fique de olho
                    </motion.span>
                    <motion.h2
                        className="ps-section-title"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Datas <span>Importantes</span>
                    </motion.h2>
                </div>

                <div className="ps-countdown-grid">
                    <CountdownCard
                        titulo="Abertura das Inscrições"
                        label="Contagem regressiva"
                        alvo={DATA_ABERTURA_INSCRICOES}
                        cor="#00a7db"
                        statusAberto="Aguardando abertura"
                        statusAtivado="Período de inscrições aberto!"
                        statusFechado="Inscrições abertas — período em andamento"
                        delay={0}
                    />
                    <CountdownCard
                        titulo="Encerramento das Inscrições"
                        label="Tempo restante"
                        alvo={DATA_ENCERRAMENTO_INSCRICOES}
                        cor="#9628a5"
                        statusAberto="Inscrições ainda não abertas"
                        statusAtivado="Últimas horas! Não perca o prazo."
                        statusFechado="Inscrições encerradas"
                        delay={0.15}
                    />
                </div>
            </section>

            {/* ── INSCRIÇÃO / PIPEFY ────────────────────────────────────────── */}
            <section id="inscricao" className="ps-inscricao-section">
                <div className="ps-inscricao-container">
                    <motion.div
                        className="ps-inscricao-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="ps-inscricao-inner">
                            {/* Coluna de texto */}
                            <div className="ps-inscricao-text">
                                <span className="ps-kicker" style={{ fontSize: '10px' }}>Inscrições</span>
                                <h2 className="ps-inscricao-title mt-4">
                                    Candidate-se ao<br />
                                    <span>PS 2026/2</span>
                                </h2>
                                <p className="ps-inscricao-desc">
                                    Preencha o formulário ao lado para garantir sua vaga no processo seletivo.
                                    Entraremos em contato para realizarmos as etapas posteriores. 
                                </p>

                                {inscricoesEncerradas ? (
                                    <p className="font-principal text-sm text-branco/40 uppercase tracking-widest">
                                        As inscrições foram encerradas.
                                    </p>
                                ) : inscricoesAbertas ? (
                                    <a href={pipefyUrl} target="_blank" rel="noopener noreferrer" id="ps-inscricao-link">
                                        <button className="ps-inscricao-btn">
                                            Acessar formulário <IconArrow />
                                        </button>
                                    </a>
                                ) : (
                                    <p className="font-principal text-sm text-secundaria/70 uppercase tracking-widest">
                                        O formulário estará disponível a partir de{' '}
                                        {DATA_ABERTURA_INSCRICOES.toLocaleDateString('pt-BR', {
                                            day: '2-digit', month: 'long', year: 'numeric',
                                            timeZone: 'America/Sao_Paulo',
                                        })}.
                                    </p>
                                )}
                            </div>

                            {/* Coluna do Formulário Pipefy */}
                            {inscricoesAbertas && pipefyUrl && (
                                <div className="ps-pipefy-wrapper">
                                    <iframe
                                        src={pipefyUrl}
                                        title="Formulário de Inscrição CompAct Jr. PS 2026/2"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── EDITAL ───────────────────────────────────────────────────── */}
            <section id="edital" className="ps-edital-section">
                <div className="ps-edital-container">
                    <div className="ps-section-header" style={{ padding: 0 }}>
                        <motion.span
                            className="ps-section-kicker"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Documentação Oficial
                        </motion.span>
                        <motion.h2
                            className="ps-section-title"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            Edital <span>PS 2026/2</span>
                        </motion.h2>
                    </div>

                    <div className="ps-edital-grid">
                        {[
                            {
                                icon: <IconEdital />,
                                title: 'Edital Completo',
                                text: 'Acesse o documento oficial com todas as regras, critérios de avaliação e cronograma do processo seletivo.',
                            },
                            {
                                icon: <IconRequisitos />,
                                title: 'Requisitos',
                                text: 'Podem se inscrever estudantes regularmente matriculados em qualquer curso de graduação da Universidade Federal de Santa Maria (UFSM), campus Santa Maria, no primeiro semestre de 2026, desde que tenham interesse em atuar nas áreas administrativa, de gestão de pessoas, comercial, comunicação ou projetos. ',
                            },
                            {
                                icon: <IconCalendario />,
                                title: 'Cronograma',
                                text: (
                                    <ul className="flex flex-col gap-1.5">
                                        {[
                                            { label: 'Inscrições',               info: '26/07 – 16/08/2026' },
                                            { label: 'Reunião e Dinâmicas',      info: '17/08/2026 às 18:30h (presencial)' },
                                            { label: 'Entrevistas individuais',  info: '18/08 – 21/08/2026 (online)' },
                                            { label: 'Resultado trainee',        info: '23/08/2026' },
                                            { label: 'Programa de trainee',      info: '24/08 – 14/09/2026 (híbrido)' },
                                        ].map(({ label, info }) => (
                                            <li key={label} className="flex flex-col">
                                                <span className="font-bold text-branco/80 text-xs uppercase tracking-wide">{label}</span>
                                                <span className="text-branco/50 text-xs">{info}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ),
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                className="ps-edital-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                            >
                                <div className="ps-edital-icon">{item.icon}</div>
                                <h3 className="ps-edital-card-title">{item.title}</h3>
                                <div className="ps-edital-card-text">{item.text}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Botão de download do edital */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <a href="/ProcessoSeletivo/EditalPS.pdf" target="_blank" rel="noopener noreferrer" download id="ps-edital-download" className="ps-edital-btn">
                            <IconDownload />
                            Baixar Edital Completo (PDF)
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── CONTATO GP ───────────────────────────────────────────────── */}
            <section id="ps-contato" className="ps-contact-section">
                <div className="ps-contact-container">
                    <motion.div
                        className="ps-contact-card"
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <span className="ps-kicker" style={{ fontSize: '10px' }}>Dúvidas?</span>
                        <h2 className="ps-contact-title mt-4">
                            Fale com a<br />
                            <span>Gestão de Pessoas</span>
                        </h2>
                        <p className="ps-contact-desc">
                            Alguma dúvida sobre o processo seletivo, critérios ou etapas?
                            Nossa equipe de Gestão de Pessoas está aqui para ajudar. Entre em contato
                            pelo e-mail abaixo e responderemos o mais rápido possível.
                        </p>

                        <a
                            href={`mailto:${gpEmail}`}
                            id="ps-email-gp"
                            className="ps-contact-email-btn"
                        >
                            <IconMail />
                            {gpEmail}
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
