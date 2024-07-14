
import './App.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import CryptoView from './components/CryptoView';

function App() {

  return (
    <>
     <Provider store={store}>
        <CryptoView />
     </Provider>
    </>
  )
}

export default App
