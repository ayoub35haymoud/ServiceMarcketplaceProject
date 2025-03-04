import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import {Provider} from 'react-redux'
import store from './store/store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
      </BrowserRouter>
  </StrictMode>
)
