import React from 'react';
import { Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { useDarkMode } from '../../hooks/useDarkMode';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-lg">
            <span className="text-xl font-bold">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SmartLeads</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <UserIcon className="h-6 w-6 text-slate-500" />
            </div>
            <button
              onClick={logout}
              className="rounded-full p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
