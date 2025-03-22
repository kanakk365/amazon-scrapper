
import { Routes , Route} from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Scrape from './pages/Scrape'
import Compare from './pages/Compare'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}  />
        <Route path='/scrape' element={<Scrape/>}  />
        <Route path='/compare' element={<Compare/>}  />
      </Routes>

    </div>
  
    
  )
}

export default App
