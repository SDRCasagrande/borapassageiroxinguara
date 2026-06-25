'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();
  const trackedPaths = useRef(new Set<string>());

  useEffect(() => {
    // Evita rastreamento duplicado na mesma sessão para o mesmo path
    // e ignora rastreamento no painel admin
    if (pathname && !pathname.startsWith('/admin') && !trackedPaths.current.has(pathname)) {
      trackedPaths.current.add(pathname);
      
      fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathname }),
      }).catch((err) => {
        // Ignora erros de rede ou de adblockers silenciosamente
        console.debug('Analytics blocked or failed');
      });
    }
  }, [pathname]);

  return null;
}
