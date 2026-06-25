'use client';

export function ActionButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full items-center justify-center md:justify-start">
            <a
                // Ao clicar, o Next.js acessa a rota /go/playstore
                // que salva o clique no Prisma e redireciona para a Play Store real
                href="/go/playstore"
                className="transform hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            >
                <img
                    src="/assets/btn-google-play.png"
                    alt="Baixar Bora Passageiro no Google Play"
                    className="h-16 w-auto object-contain"
                />
            </a>

            <a
                // Ao clicar, o Next.js acessa a rota /go/appstore
                // que salva o clique no Prisma e redireciona para a App Store real
                href="/go/appstore"
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
