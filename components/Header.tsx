import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { NavItem } from '../types';

interface HeaderProps {}

const navItems: NavItem[] = [
  { label: 'About Us', href: '#philosophy' },
  { label: 'Profile', href: '#profile' },
  { 
    label: 'Service', 
    href: '#services',
    subItems: [
      { label: '情シス代行', href: '/josys' },
      { label: 'データコンサルティング', href: '/data-consulting' },
      { label: '生成Ai活用支援', href: '/gen-ai' },
      { label: 'Web制作', href: '/web-production' },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      setIsScrolled(prev => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setActiveDropdown(null);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="relative group z-50">
          <span className="font-en text-2xl font-semibold tracking-wider text-gray-900">Arcle</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <a 
                href={item.href} 
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                  } else {
                    handleNavigation(e, item.href);
                  }
                }} 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative font-en cursor-pointer flex items-center gap-1"
              >
                {item.label}
                {item.subItems && <ChevronDown size={14} />}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Desktop Dropdown */}
              {item.subItems && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 overflow-hidden">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={(e) => handleNavigation(e, subItem.href)}
                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50 text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col space-y-6 w-full max-w-xs">
            {navItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <a 
                    href={item.href} 
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        toggleDropdown(item.label);
                      } else {
                        handleNavigation(e, item.href);
                      }
                    }} 
                    className="text-2xl font-light text-gray-800 font-en cursor-pointer"
                  >
                    {item.label}
                  </a>
                  {item.subItems && (
                    <button onClick={() => toggleDropdown(item.label)} className="p-1">
                      {activeDropdown === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  )}
                </div>
                
                {/* Mobile Submenu */}
                {item.subItems && (
                  <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === item.label ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col space-y-4 bg-gray-50 rounded-xl p-4">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={(e) => handleNavigation(e, subItem.href)}
                          className="text-lg text-gray-600 hover:text-blue-600 font-en"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};