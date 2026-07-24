'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './styles/Contact.css'

/**
 * COMPONENTE DE CONTATO (CONTACT SECTION)
 * @description Seção final de conversão.
 * Layout de 2 colunas: Informações e Mapa dedicado à esquerda, Formulário Glassmorphism à direita.
 * Inclui estado de sucesso interativo após submissão e integração com API de e-mail.
 * @kayualins - Equipe de Projetos CompAct Jr.
 */

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
)
const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
)
const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon-small"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
)
const CheckCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-secundaria mb-6 mx-auto"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
)

export default function Contact() {
    // ESTADO: Controla a exibição visual da tela de sucesso
    const [isSubmitted, setIsSubmitted] = useState(false)

    // ESTADO: Controla os dados digitados pelo usuário
    const [formData, setFormData] = useState({
        nome: '', empresa: '', email: '', telefone: '', mensagem: ''
    })

    // ESTADO: Controla o status do carregamento (loading/error)
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

    // FUNÇÃO: Atualiza os dados conforme o usuário digita
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // FUNÇÃO DE SUBMISSÃO (Conectada à Rota API)
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                // Sucesso: Mostra a tela verde e limpa o formulário
                setIsSubmitted(true)
                setStatus('idle')
                setFormData({ nome: '', empresa: '', email: '', telefone: '', mensagem: '' })
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <section id="contato" className="contact-section">
            <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start pt-24 pb-32">

                {/* COLUNA ESQUERDA: INFORMAÇÕES E MAPA DEDICADO */}
                <motion.div
                    className="contact-info-col"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mb-10">
                        <h2 className="contact-main-title">
                            Converse com a<br />
                            <span className="text-secundaria">CompAct Jr.</span>
                        </h2>

                        <div className="contact-address-block">
                            <div className="flex items-start gap-3">
                                <MapPinIcon />
                                <p className="contact-address-text">
                                    Av. Roraima, 1000 - CT - Sala 317<br />
                                    Campus Camobi, Santa Maria/RS<br />
                                    CEP 97105-900
                                </p>
                            </div>
                        </div>

                        <div className="contact-social-links">
                            <a href="https://wa.me/555596018036?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20CompAct%20Jr." className="contact-social-btn group" target="_blank" aria-label="WhatsApp">
                                <div className="contact-icon-wrapper"><WhatsAppIcon /></div>
                                <span className="contact-social-label">Chame no WhatsApp</span>
                            </a>
                            <a href="https://mail.google.com/mail/u/0/?view=cm&tf=1&to=comercial@compactjr.com&su=Assunto%20do%20Email&body=Olá,%20tudo%20bem?%0A%0AGostaria%20de%20saber%20mais%20sobre%20a%20Compact!" target="_blank" className="contact-social-btn group" aria-label="E-mail">
                                <div className="contact-icon-wrapper"><MailIcon /></div>
                                <span className="contact-social-label">Envie um E-mail</span>
                            </a>
                        </div>
                    </div>

                    {/* MAPA INTERATIVO DESOBSTRUÍDO COM ALFINETE */}
                    <div className="contact-map-box">
                        <iframe
                            src="https://maps.google.com/maps?q=Centro+de+Tecnologia+UFSM+Santa+Maria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização CompAct Jr. no Google Maps"
                        ></iframe>
                    </div>
                </motion.div>

                {/* COLUNA DIREITA: FORMULÁRIO (GLASSMORPHISM) */}
                <motion.div
                    className="contact-form-col"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="contact-form">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                // ESTADO 1: FORMULÁRIO PARA PREENCHER
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="contact-form-header">
                                        <h3 className="contact-form-title">Ou preencha o formulário</h3>
                                        <p className="contact-form-subtitle">Que entraremos em contato com você o mais rápido possível.</p>
                                    </div>

                                    <div className="contact-input-grid">
                                        <div className="contact-input-group">
                                            <label htmlFor="nome">Nome</label>
                                            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome completo" required />
                                        </div>
                                        <div className="contact-input-group">
                                            <label htmlFor="empresa">Empresa</label>
                                            <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} placeholder="Nome do seu negócio" />
                                        </div>
                                    </div>

                                    <div className="contact-input-grid">
                                        <div className="contact-input-group">
                                            <label htmlFor="email">E-mail</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
                                        </div>
                                        <div className="contact-input-group">
                                            <label htmlFor="telefone">Telefone</label>
                                            <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(55) 90000-0000" required />
                                        </div>
                                    </div>

                                    <div className="contact-input-group">
                                        <label htmlFor="mensagem">Nos explique sua necessidade</label>
                                        <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} rows={4} placeholder="Como a CompAct Jr. pode ajudar o seu negócio a crescer?" required></textarea>
                                    </div>

                                    {/* Feedback de Erro */}
                                    {status === 'error' && (
                                        <p className="text-red-400 text-sm mb-4 font-principal">Ocorreu um erro ao enviar. Tente novamente.</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="contact-submit-btn disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                                    </button>
                                </motion.form>
                            ) : (
                                // ESTADO 2: MENSAGEM DE SUCESSO (Renderizada após submissão)
                                <motion.div
                                    key="success"
                                    className="flex flex-col items-center justify-center text-center py-12 md:py-20 h-full"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <CheckCircleIcon />
                                    <h3 className="contact-form-title text-secundaria mb-4">Mensagem Enviada!</h3>
                                    <p className="contact-form-subtitle text-base leading-relaxed max-w-md mx-auto">
                                        Agradecemos o seu contato. A nossa equipe analisará a sua necessidade e retornará em breve com a melhor solução para você.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-8 font-principal text-sm text-branco/50 hover:text-branco underline underline-offset-4 transition-colors cursor-pointer"
                                    >
                                        Enviar outra mensagem
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}