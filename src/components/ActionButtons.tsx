'use client';

import { PLAY_STORE_URL, APP_STORE_URL } from './DownloadModal';
import { reportConversion } from '@/lib/tracking';

export function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full items-center justify-center md:justify-start">
            <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={reportConversion}
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            >
                <img
                    src="/assets/btn-google-play.png"
                    alt="Baixar Bora Passageiro no Google Play"
                    className="h-16 w-auto object-contain"
                />
            </a>

            <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={reportConversion}
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            >
                <img
                    src="/assets/btn-app-store.png"
                    alt="Baixar Bora Passageiro na App Store"
                    className="h-16 w-auto object-contain"
                />
            </a>
        </div>
    );
}
