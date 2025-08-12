import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import BackToTop from './components/BackToTop';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default class App extends Component {
  pageSize = 5;

  constructor() {
    super();
    this.state = {
      darkMode: false
    };
  }

  toggleDarkMode = () => {
    this.setState(
      prevState => ({ darkMode: !prevState.darkMode }),
      () => {
        document.body.classList.toggle("dark-mode", this.state.darkMode);
      }
    );
  };

  render() {
    const { darkMode } = this.state;

    return (
      <div className={darkMode ? "app dark" : "app"}>
        <Router>
          <Navbar toggleDarkMode={this.toggleDarkMode} />
          <Routes>
            <Route path="/" element={<News key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route path="/business" element={<News key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route path="/general" element={<News key="general2" pageSize={this.pageSize} country="us" category="general" />} />
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" category="technology" />} />

            {/* Default redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <BackToTop />
        </Router>
      </div>
    );
  }
}
