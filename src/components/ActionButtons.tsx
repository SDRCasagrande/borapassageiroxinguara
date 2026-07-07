'use client';

import { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';
import { PLAY_STORE_URL, APP_STORE_URL } from './DownloadModal';

export function ActionButtons() {
    const [copied, setCopied] = useState(false);
    const promoCode = 'CCSSM376920';
    const promoLink = `https://paineladmin3.azurewebsites.net/borapassageiro/linkapp/1/${promoCode}`;

    const handleGetDiscount = () => {
        navigator.clipboard.writeText(promoCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        window.open(promoLink, '_blank');
    };

    return (
        <div className="flex flex-col gap-6 mt-10 w-full items-center md:items-start">
            {/* Gatilho Promocional */}
            <button
                onClick={handleGetDiscount}
                className="group relative flex items-center justify-between w-full max-w-sm bg-gradient-to-r from-cyan-600 to-blue-600 p-1 rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
                <div className="flex items-center gap-4 bg-black/50 backdrop-blur-md rounded-xl px-4 py-3 w-full">
                    <div className="bg-cyan-500/20 p-2 rounded-lg">
                        <Gift className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex flex-col text-left flex-1">
                        <span className="text-white font-bold text-sm sm:text-base leading-tight">
                            Ganhe R$ 5 de Desconto
                        </span>
                        <span className="text-cyan-200 text-xs mt-0.5">
                            Na sua primeira corrida!
                        </span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                        {copied ? (
                            <Check className="w-5 h-5 text-green-400" />
                        ) : (
                            <Copy className="w-5 h-5 text-cyan-50" />
                        )}
                    </div>
                </div>
            </button>

            {/* Botoes das Lojas */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
                <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                >
                    <img
                        src="/assets/btn-google-play.png"
                        alt="Baixar Bora Passageiro no Google Play"
                        className="h-14 sm:h-16 w-auto object-contain"
                    />
                </a>

                <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                >
                    <img
                        src="/assets/btn-app-store.png"
                        alt="Baixar Bora Passageiro na App Store"
                        className="h-14 sm:h-16 w-auto object-contain"
                    />
                </a>
            </div>
        </div>
    );
}

