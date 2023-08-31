import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/login';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/admin' element={<AdminPanel/>} />
          <Route path='/' element={<Login/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
