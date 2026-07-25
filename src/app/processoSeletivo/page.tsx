/**
 * PÁGINA PROCESSO SELETIVO — /processoSeletivo
 * @description Rota dedicada ao PS 2026/2.
 * só aparece quando NEXT_PUBLIC_ATIVAR_PAGINA_PS=true.
 * @author zaluar
 */

import { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import ProcessoSeletivoComponent from '@/src/components/ProcessoSeletivo'
import BackgroundGlow from '@/src/components/BackgroundGlow'

export const metadata: Metadata = {
    title: 'Processo Seletivo 2026/2',
    description:
        'Faça parte da CompAct Jr. — a primeira Empresa Júnior de TI do Rio Grande do Sul. Inscreva-se no Processo Seletivo 2026/2 e desenvolva habilidades reais em tecnologia.',
    keywords: [
        'Processo Seletivo',
        'CompAct Jr.',
        'Empresa Júnior',
        'TI',
        'Santa Maria',
        'UFSM',
        'PS 2026',
        'Inscrição',
    ],
    openGraph: {
        title: 'Processo Seletivo 2026/2 | CompAct Jr.',
        description:
            'Inscreva-se no PS 2026/2 da CompAct Jr. e faça parte da melhor Empresa Júnior de TI do Rio Grande do Sul.',
        url: 'https://project-nextjs-one-rose.vercel.app/processoSeletivo',
        siteName: 'CompAct Jr.',
        locale: 'pt_BR',
        type: 'website',
    },
}

export default function ProcessoSeletivoPage() {

    return (
        <main className="relative bg-preto min-h-screen w-full max-w-[100vw] overflow-x-clip flex flex-col">
            <BackgroundGlow />
            <div className="relative z-10 w-full">
                <Header />
                <ProcessoSeletivoComponent />
                <Footer />
            </div>
        </main>
    )
}