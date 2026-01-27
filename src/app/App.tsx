import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BalloonProvider } from '../contexts/BalloonContext';
import Layout from '../components/layout/Layout';
import HomePage from '../Pages/Home';
import Work from '../Pages/Work';
import About from '../Pages/About';
import Contact from '../Pages/Contact';

export default function App() {
    return (
        <Router>
            <BalloonProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Layout>
            </BalloonProvider>
        </Router>
    );
}
