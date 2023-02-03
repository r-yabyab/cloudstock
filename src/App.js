import './App.css';
import RefPage from './components/RefPage'
import TopNav from './components/TopNav';
import { Route, Routes } from "react-router-dom"
import HomePage from './components/HomePage';
import About from './components/About';

function App() {
  return (
<>
<div className=' bg-slate-800 text-white h-[2000px]'>
      <TopNav />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/refpage' element={<RefPage />} />
        <Route path='/about' element={<About />} />
      </Routes>

      </div>
    </>
  );
}

export default App;
