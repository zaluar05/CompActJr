
import { Metadata } from 'next'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Apoiadores from '../components/Apoiadores'
import Indicadores from '../components/Indicadores'
import BackgroundGlow from '../components/BackgroundGlow'
import About from '../components/About'
import Clientes from "@/src/components/Clientes";
import Services from "@/src/components/Services";
import SectionsWithWatermark from "@/src/components/SectionsWithWatermark";
import Pillars from "@/src/components/Pillars";
import Values from "@/src/components/Values";
import History from "@/src/components/History";
import Team from "@/src/components/Team";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import FloatingButton from "@/src/components/FloatingButton";
import Portfolio from "@/src/components/Portfolio";
import ProcessoSeletivo from "@/src/components/ProcessoSeletivo";

/**
 * EXPLICAÇÃO TÉCNICA (Capacitação da Equipe):
 * Note a ausência da diretiva 'use client' no topo deste arquivo.
 * Por padrão, rotas no Next.js App Router são Server Components. Isso é OBRIGATÓRIO
 * para podermos exportar o objeto 'metadata' e permitir que o SEO e o Tráfego Pago funcionem.
 * A interatividade (JavaScript no navegador) está encapsulada e delegada apenas para
 * os componentes filhos (Header e Hero), que possuem 'use client' em seus respectivos arquivos.
 */

// METADADOS ESPECÍFICOS DA HOMEPAGE
// Focado inteiramente em SEO, indexação orgânica e conversão para Tráfego Pago.
export const metadata: Metadata = {
    title: 'Desenvolvimento de Software e Sistemas Web em Santa Maria',
    description: 'A CompAct Jr. oferece soluções em TI, sites profissionais e softwares sob medida. Aumente a eficiência do seu negócio com a melhor Empresa Júnior de TI.',
    keywords: ['Empresa Júnior TI', 'Desenvolvimento Web', 'Santa Maria', 'Sistemas sob medida', 'Aplicativos', 'CompAct Jr'],
    openGraph: {
        title: 'CompAct Jr. | Soluções em TI que Transformam Negócios',
        description: 'Desenvolvimento profissional de softwares e sites com a qualidade de uma Empresa Júnior de excelência.',
        url: 'https://project-nextjs-one-rose.vercel.app/',
        siteName: 'CompAct Jr.',
        images: [
            {
                url: '/og-image.png', // A equipe de design deverá criar esta imagem de 1200x630px depois
                width: 1200,
                height: 630,
                alt: 'Capa de apresentação gráfica da CompAct Jr.',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
}

export default function Home() {
    // Lê a variável de ambiente no Server Component para renderizar o PS condicionalmente
    const psAtivo = process.env.NEXT_PUBLIC_ATIVAR_PAGINA_PS === 'true'

    return (
        <main className="relative bg-preto min-h-screen w-full max-w-[100vw] overflow-x-clip flex flex-col">
            <BackgroundGlow />
            <div className="relative z-10 w-full">
                <Header />
                <Hero />
                <Apoiadores />
                <Indicadores />
                <About />
                <Clientes />

                <SectionsWithWatermark>
                    <Services />
                    <Pillars />
                    <Values />
                </SectionsWithWatermark>

                <Portfolio />
                <History />
                <Team />
                {/* Seção PS — renderizada somente quando NEXT_PUBLIC_ATIVAR_PAGINA_PS=true */}
                {psAtivo && <ProcessoSeletivo />}
                <Contact />
                <Footer />
            </div>
            <FloatingButton />
        </main>
    )
}