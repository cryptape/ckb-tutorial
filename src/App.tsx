import Header from './components/Header/Header'
import AppRouter from './Routes/BrowserRoutes';
import Footer from "./components/Footer/Footer";
import './App.css'



function App() {
    return (
        <>
            <Header />
            <div className="markdown-content-wrapper">
                <AppRouter />
            </div>
            <Footer />
        </>
    )
}

export default App;
