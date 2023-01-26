import './App.css';
import { DataFetch } from './components/DataFetch';
import RefPage from './components/RefPage'
import TopNav from './components/TopNav';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
<>
<div className=' bg-zinc-100'>
      <TopNav />

      <Routes>
        <Route path='/' element={<DataFetch />} />
        <Route path='/refpage' element={<RefPage />} />
      </Routes>
      penis penis penis

      Limited to 50 symbols
      </div>
    </>
  );
}

export default App;
