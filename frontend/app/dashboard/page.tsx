'use client'
import {useState , useEffect , useContext} from 'react';
import Templetes from './components/Templetes';
import SpecficTemplete from './components/SpecficTemplete';
import {EmailContext} from '@/hooks/useEmail'


export interface IAppProps {
}

export default  function App ({}: IAppProps) {
  const [templetes , setTempletes] = useState([]);
  const [specficTemplete , setSpecficTemplete] = useState(null as any)
  const {email , setEmail} = useContext(EmailContext);

  const getData = async() => {
    try {
      const res = await fetch("http://localhost:8000/templete/all");
      const Data = await res.json();
      setTempletes(Data)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  return (
    <div className='flex items-center justify-between'>
     <div className='w-[20%] bg-[--bg-secondary] min-h-[100vh] p-6'>
      <Templetes setSpecficTemplete = {setEmail} templetes = {templetes}/>
     </div>
     <div className='w-[80%] bg-[--bg-tertiary] min-h-[100vh] p-6'>
      {
      email ? <SpecficTemplete specficTemplete={email}/> : <h1 className='text-[25px] text-white text-center'>Choose Templete</h1>
      }
     </div>
    </div>
  );
}
