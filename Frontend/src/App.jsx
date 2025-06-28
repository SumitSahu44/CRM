import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import SalesLayout from './pages/Sales/SalesLayout';
import Dashboard from './pages/Sales/Dashboard';
import ViewLeads from './pages/Sales/ViewLeads';
import AddLead from './pages/Sales/AddLead';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
   
        <Route path="/sales" element={<SalesLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="view-leads" element={<ViewLeads />} />
            <Route path="add-lead" element={<AddLead />} />
        </Route>


    </Routes>
  );
}

export default App;
