import 'bootstrap/dist/css/bootstrap.min.css';
import Database from './components/Database';
import Users from './components/Users'

function App() {
  return (
    <div className='container-fluid'>
    <Users/>  <br/><hr/>
    <Database/>   <br/><hr/>
    </div>
  )
}

export default App
