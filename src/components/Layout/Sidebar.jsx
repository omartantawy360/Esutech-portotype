import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, FileText, Settings, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const links = user?.role === 'admin'
    ? [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Add Competition', path: '/admin/create-competition', icon: Award },
      ]
    : [
        { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
        { name: 'Register', path: '/register', icon: FileText },
      ];

  if (!user) return null;

  return (
    <>
        {/* Mobile Overlay */}
        {isOpen && (
            <div 
                className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
                onClick={onClose}
            />
        )}

        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
            <span className="text-xl font-bold text-primary-600">EduComp</span>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                <LogOut className="h-5 w-5 rotate-180" /> {/* Reusing LogOut icon as Close for simplicity, or use X */}
            </Button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto py-4">
            <nav className="flex-1 space-y-1 px-3">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={onClose} // Close on link click (mobile)
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900",
                            isActive ? "bg-primary-50 text-primary-700 hover:bg-primary-50 hover:text-primary-700" : "text-slate-700"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <div className="border-t border-slate-200 p-4">
                <div className="mb-4 flex items-center gap-3 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-700 truncate w-32">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
          </div>
        </aside>
    </>
  );
};

export default Sidebar;
