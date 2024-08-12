import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ReportIncident from './Components/ReportIncident';
import NOCApplication from './Components/NocApplication';
import BookFireDrill from './Components/BookFireDrill';
import Resources from './Components/Resources';
import Contact from '../src/Components/Contact';

const App = () => {
    return (
        <div>
          <Navbar />
          <Home />
          <NOCApplication />
          <BookFireDrill />
          <Resources />
          <Contact />
        </div>
      );
    }
    
    export default App;
