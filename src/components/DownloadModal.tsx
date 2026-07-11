'use client';

import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';

interface DownloadModalContextType {
  open: () => void;
}

const DownloadModalContext = createContext<DownloadModalContextType>({ open: () => {} });

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.devbase.borapassageiro&pcampaignid=web_share';
export const APP_STORE_URL = 'https://apps.apple.com/br/app/bora-passageiro-clientes/id1579518558';

export function useDownloadModal() {
  return useContext(DownloadModalContext);
}

export function DownloadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DownloadModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#0c1222] border border-white/10 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Baixar o App</h3>
                <p className="text-white/50 text-sm mt-1">Escolha sua plataforma</p>
              </div>

              <div className="space-y-3">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={reportConversion}
                  className="flex items-center gap-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-2xl p-4 transition-all"
                >
                  <img src="/assets/btn-google-play.png" alt="Google Play" className="h-10 w-auto object-contain" />
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">Google Play</p>
                    <p className="text-white/40 text-xs">Android</p>
                  </div>
                </a>

                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={reportConversion}
                  className="flex items-center gap-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-2xl p-4 transition-all"
                >
                  <img src="/assets/btn-app-store.png" alt="App Store" className="h-10 w-auto object-contain" />
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">App Store</p>
                    <p className="text-white/40 text-xs">iPhone / iPad</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DownloadModalContext.Provider>
  );
}

export function DownloadButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open } = useDownloadModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
