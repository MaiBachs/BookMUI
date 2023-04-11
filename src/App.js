import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Book from './Page/Book/Book.js';
import Home from './Page/Home/Home.js';
import Bill from './Page/Bill/Bill.js';
import ARi from './Page/ARi/ARi.js';
import PurchaseOrder from './Page/PurcharseOder/PurchaseOrder';
import Rules from './Page/Rule/Rules.js';
import Login from './Page/Login/Login.js';
import Logout from './Page/Logout/Logout.js';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path="/getbook" element={<Book />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/bill" element={<Bill />}></Route>
                        <Route path="/ari" element={<ARi />}></Route>
                        <Route path="/purchaseoder" element={<PurchaseOrder />}></Route>
                        <Route path="/rule" element={<Rules />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>

                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}

export default App;
