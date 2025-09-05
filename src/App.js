import 'bootstrap/dist/css/bootstrap.min.css';
import Database from './components/Database';
import CRUD from './components/CRUD';
import Users from './components/Users'
import Photos from './components/Photos'

function App() {
  return (
    <div className='container-fluid'>
    <Users/>  <br/><hr/>
    <CRUD/>   <br/><hr/>
    </div>
  )
}

export default App
