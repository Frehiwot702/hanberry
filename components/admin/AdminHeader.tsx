"use client";

interface AdminHeaderProps {
  onLogout: () => Promise<void> | void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="h-[60px] bg-black rounded-b-[64px] px-16 flex items-center justify-between text-white text-[16px] font-extrabold">
      <span className="opacity-0 select-none">Admin</span>
      <span>Hanberry Beauty</span>
      <button onClick={onLogout} className="hover:opacity-80 transition-opacity">
        Out
      </button>
    </header>
  );
}
