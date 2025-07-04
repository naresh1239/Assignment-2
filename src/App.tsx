import { lazy, Suspense, useEffect, useState } from 'react'
const Cards = lazy(() => import('./components/Cards'));
import type { CardDataType } from './components/types';
import jdata from './components/UsersData.json';
const App = () => {
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [data, setdata] = useState<CardDataType[]>([])
  const [ifError, setifError] = useState<unknown>('')

  const cardDatafn = async() =>{
    try {
      setdata(jdata);
    } catch (error) {
      console.error('Error fetching card data:', error);
      setifError(error)
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    cardDatafn()
  }, [])
  
  if(isLoading){
   return <Loader/>
  }

  if(ifError){
    return <div className='error'>Error fetching data: {ifError.toString()}</div>
  }

  return (
    <div>
      <Suspense fallback={<Loader/>}>
      <Cards data={data}/>
      </Suspense>
      
    </div>
  )
}

const Loader = () =>{
  return (
    <div className='Loader'>
    <div className="sk-folding-cube">
  <div className="sk-cube1 sk-cube"></div>
  <div className="sk-cube2 sk-cube"></div>
  <div className="sk-cube4 sk-cube"></div>
  <div className="sk-cube3 sk-cube"></div>
</div>
</div>
  )
}

export default App