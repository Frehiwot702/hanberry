'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useTransition } from 'react';

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile';
}

export default function LanguageSelector({ variant = 'desktop' }: LanguageSelectorProps) {
  const currentLocale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'am', label: 'አማርኛ', short: 'አማ' },
  ];

  const currentLanguage = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleSelect = (locale: string) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Set cookie with 1 year expiration
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);

    startTransition(() => {
      router.refresh();
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between py-2 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#C9A34E]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="font-light">{currentLocale === 'am' ? 'ቋንቋ' : 'Language'}</span>
          </span>

          <div className="inline-flex rounded-full border border-gray-300 p-0.5 bg-[#FAF6F0]/60" role="group" aria-label="Language selector">
            {languages.map((lang) => {
              const isSelected = currentLocale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  disabled={isPending}
                  onClick={() => handleSelect(lang.code)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-xs'
                      : 'text-gray-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant: Elegant minimal dropdown
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="group flex items-center gap-1.5 text-black hover:text-[#C9A34E] text-base md:text-lg font-light transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A34E]/50 rounded-md px-1.5 py-0.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-700 group-hover:text-[#C9A34E] transition-colors"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="tracking-wide">{currentLanguage.short}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 text-gray-500 group-hover:text-[#C9A34E] ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          className="absolute right-0 mt-2 w-36 rounded-xl bg-white/95 backdrop-blur-xs border border-gray-200 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {languages.map((lang) => {
            const isSelected = currentLocale === lang.code;
            return (
              <button
                key={lang.code}
                role="menuitem"
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'font-medium text-black bg-[#FAF6F0]'
                    : 'text-gray-700 hover:bg-[#FAF6F0]/70 hover:text-black font-light'
                }`}
              >
                <span>{lang.label}</span>
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A34E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
