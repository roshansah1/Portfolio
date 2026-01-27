import Header from './Header';
import ThreeBackground from '../ThreeBackground';
import { useBalloon } from '../../contexts/BalloonContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isHovered } = useBalloon();
    
    return (
        <div className="site-wrapper">
            <ThreeBackground isHovered={isHovered} />
            <Header />
            <main className="main-content">{children}</main>
        </div>
    );
}
