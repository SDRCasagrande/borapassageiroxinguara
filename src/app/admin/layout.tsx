'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Link2, 
  Users,
  UserPlus,
  Trophy,
  FileBarChart,
  Menu, 
  X,
  LogOut,
  ChevronRight,
  Gift
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Rastreamento', href: '/tracking', icon: Link2 },
    { name: 'Motoristas', href: '/motoristas', icon: Users },
    { name: 'Relatórios', href: '/relatorios', icon: FileBarChart },
    { name: 'Pré-Cadastros', href: '/leads', icon: UserPlus },
    { name: 'Promoções', href: '/admin/banners', icon: Gift },
    { name: 'Ranking', href: 'https://ranking.borapassageiroxinguara.com.br', icon: Trophy },
  ];

  return (
    <div className="h-screen bg-gray-50 text-slate-800 flex overflow-hidden font-sans">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-56 bg-white border-r border-gray-200/80
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shrink-0 h-screen
      `}>
        {/* Logo */}
        <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <Link href="/" className="flex items-center">
            <img 
              src="/assets/Logotipo.png" 
              alt="Bora Passageiro" 
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          <p className="px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">Menu</p>
          {navigation.map((item) => {
            const isExternal = item.href.startsWith('http');
            const isActive = !isExternal && pathname === item.href;
            const Comp = isExternal ? 'a' : Link;
            const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

            return (
              <Comp
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-[13px] font-medium
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-500 hover:bg-gray-50 hover:text-slate-700'
                  }
                `}
                {...extraProps}
              >
                <div className={`
                  w-7 h-7 rounded-md flex items-center justify-center transition-all shrink-0
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-slate-400 group-hover:bg-gray-200 group-hover:text-slate-600'
                  }
                `}>
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 ml-auto shrink-0" />}
              </Comp>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100 shrink-0">
          <button 
            onClick={async () => {
              await fetch('/api/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all text-[13px] font-medium group"
          >
            <div className="w-7 h-7 rounded-md bg-gray-100 group-hover:bg-rose-100 flex items-center justify-center transition-all shrink-0">
              <LogOut className="w-3.5 h-3.5" />
            </div>
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200/80 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-bold text-white">BP</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-none">Admin</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Bora Passageiro</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gray-50/50">
          {children}
        </div>
      </main>
    </div>
  );
}
