import React from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApplicationForm } from './ApplicationForm';

export default function App() {
  return (
    <div>
      <h2 className='mt-3 text-center'>Job Application Tracker</h2>
      <ApplicationForm />
    </div>
  );
}
