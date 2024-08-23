import './App.css'
import AppRoutes from './components/routes'
import DataProvider from './context/DataContext'

function App() {

  return (
    <>
      <DataProvider>
        <AppRoutes />
      </DataProvider>

    </>
  )
}

export default App
