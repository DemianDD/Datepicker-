import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { DatePicker } from './DatePicker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/pages/Sundays" Component={DatePicker} />
        <Route path="*" element={<Navigate replace to="/pages/Sundays" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
