import './App.css';
// import RefPage from './components/RefPage'
import TopNav from './components/TopNav';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import HomePage from './components/HomePage';
import About from './components/About';
import demogif from './photos/demogif1.gif'
import logo512 from './photos/logo512.png'



function App() {

    const { user, isAuthenticated, isLoading } = useAuth0();
  
  //   if (isLoading) {
  //     return <div>Loading...</div>
  //   }

  //   return (
  //     isAuthenticated && (
  //       <div>
  //         <img src={user.picture} alt={user.name} />
  //         <h2>{user.name}</h2>
  //         <p>{user.email}</p>
  //       </div>
  //     )
  //   )
  // }

  const [hide, setHide] = useState (false)
  const [entered, setEntered] = useState(false) 

  const hideHandler = (e) => {
    setHide(!hide)
  }

        // for hide toggle
        useEffect(() => {
          const hideData = localStorage.getItem('_hide_toggle')
          if (hideData !== null) setHide(JSON.parse(hideData))
      }, [])
  
      useEffect(() => {
          localStorage.setItem('_hide_toggle', JSON.stringify(hide));
        }, [hide]);

        // for entered toggle
        useEffect(() => {
          const enteredData = localStorage.getItem('_entry')
          if (enteredData !== null) setEntered(JSON.parse(enteredData))
      }, [])
  
      useEffect(() => {
          localStorage.setItem('_entry', JSON.stringify(entered));
        }, [entered]);

        const enteredHandler = (e) => {
          setEntered(true)
          console.log(entered)
        }

  return (
<>
{/* <div className='absolute w-full h-full bg-neutral-800   text-white '> */}

<div className={entered ? 'hidden' : 'w-full select-none h-full absolute z-10 text-white bg-black'}>
  
        <div className='mt-32 flex [&>div]:m-auto  flex-col'>
          <div className=' text-[36px] gap-4 pb-14 flex justify-center'>
            <img className='w-[60px]' src={logo512} alt="logo" />
            <div>Stock Shapes
            </div>
          </div>
          <div className='max-md:w-[400px] max-md:text-center'>Track your stocks in real time during market hours with spatial freedom.</div>
          <div className='max-md:pt-4'>Max 5 stocks allowed on screen.</div>
          <img draggable={false} className='m-auto mt-8 mb-10 md:w-[600px]  max-md:w-[400px]' src={demogif} alt='demo gif' />
          <button onClick={enteredHandler} className='bg-green-700 w-[400px] m-auto hover:bg-green-200 hover:text-black p-4 text-2xl tracking-wide font-semibold'>Continue to site</button>
        </div>

</div>

<div className='absolute w-full h-full   text-white '>
      <div className={hide ? "hidden" : ""}><TopNav  user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} /></div>



      <Routes>
        <Route path='/' element={<HomePage hide={hide} />} />
        {/* <Route path='/refpage' element={<RefPage />} /> */}
        <Route path='/about' element={<About />} />
      </Routes>

<button onClick={hideHandler} className={`absolute font-semibold p-2 w-[70px] right-0 top-[80px] select-none
${hide 
?'bg-green-600 hover:bg-green-400' 
:'bg-red-600  hover:bg-red-400'}`}
>
  {hide ? 'show' : "hide" }</button>
  <div className='fixed inset-0 bg-neutral-800 z-[-1] pointer-events-none'></div>
      </div>
    </>
  );
}



export default App;
