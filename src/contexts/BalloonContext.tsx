/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface BalloonContextType {
    isHovered: boolean;
    setIsHovered: (hovered: boolean) => void;
}

const BalloonContext = createContext<BalloonContextType | undefined>(undefined);

export function BalloonProvider({ children }: { children: ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <BalloonContext.Provider value={{ isHovered, setIsHovered }}>
            {children}
        </BalloonContext.Provider>
    );
}

export function useBalloon() {
    const context = useContext(BalloonContext);
    if (context === undefined) {
        throw new Error('useBalloon must be used within a BalloonProvider');
    }
    return context;
}
