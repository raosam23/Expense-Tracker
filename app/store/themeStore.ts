import { create } from "zustand";

interface ThemeStore {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setInitialTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    isDarkMode: false,
    toggleDarkMode: () => {
        set((state) => {
            const nextTheme = state.isDarkMode ? 'light' : 'dark';
            localStorage.setItem('theme', nextTheme);
            return {
                isDarkMode: !state.isDarkMode
            };
        });
    },
    setInitialTheme: () => {
        const savedTheme = localStorage.getItem('theme') ?? 'light';
        localStorage.setItem('theme', savedTheme);
        set({ isDarkMode: savedTheme === 'dark' });
    },
}));