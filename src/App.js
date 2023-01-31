import './App.css';
import RefPage from './components/RefPage'
import TopNav from './components/TopNav';
import { Route, Routes } from "react-router-dom"
import HomePage from './components/HomePage';

function App() {
  return (
<>
<div className=' bg-zinc-100'>
      <TopNav />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/refpage' element={<RefPage />} />
      </Routes>

      </div>
    </>
  );
}

export default App;
