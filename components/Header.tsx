"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export function Header({ onAddClick }: { onAddClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50  text-[#FFBA26] p-2 bg-white ">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-10">
          <a href="#home" className="text-xl font-bold text-primary flex gap-1">
            <img src="/Mask.svg" alt="logo"  width={18}/>
            <p><span className="text-orange-700">Food</span><span className="text-[#F17228]">Wagen</span></p>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <button className="food-btn"  onClick={onAddClick}>
              Add Food
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              ref={toggleBtnRef}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="py-4 flex flex-col gap-2">
            <div className="px-3">
              <button
                className="w-full food-btn"
                onClick={() => {
                  setIsOpen(false);
                  onAddClick?.();
                }}
              >
                Add Food
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
