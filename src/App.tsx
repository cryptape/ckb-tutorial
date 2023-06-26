import Header from './components/Header/Header'
import AppRouter from './Routes/BrowserRoutes';
import './App.css'

function App() {
    return (
        <>
            <Header />
            <div className="markdown-content-wrapper">
                <AppRouter />
            </div>
        </>
    )
}

export default App;
