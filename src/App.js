import './App.css';
// import RefPage from './components/RefPage'
import TopNav from './components/TopNav';
import { Route, Routes } from "react-router-dom"
import HomePage from './components/HomePage';
import About from './components/About';
import { useState } from 'react';

function App() {

  const [hide, setHide] = useState (false)

  const hideHandler = () => {
    setHide(!hide)
  }

  return (
<>
{/* <div className='absolute w-full h-full bg-neutral-800   text-white '> */}
<div className='absolute w-full h-full   text-white '>
      <div className={hide ? "hidden" : ""}><TopNav /></div>

      <Routes>
        <Route path='/' element={<HomePage hide={hide} />} />
        {/* <Route path='/refpage' element={<RefPage />} /> */}
        <Route path='/about' element={<About />} />
      </Routes>

<button onClick={hideHandler} className={hide ?'bg-green-600 w-[70px] select-none p-4 absolute top-[41px] right-4 hover:bg-green-400' :'bg-red-600 p-4 absolute top-[41px]  w-[70px] right-4 hover:bg-red-400'}
>
  {hide ? "show" : "hide" }</button>
  <div className='fixed inset-0 bg-neutral-800 z-[-1] pointer-events-none'></div>
      </div>
    </>
  );
}

export default App;
