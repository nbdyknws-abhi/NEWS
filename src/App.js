import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import BackToTop from './components/BackToTop'; // ✅ Import the Back to Top component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 5;

  constructor() {
    super();
    this.state = {
      darkMode: false
    };
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }), () => {
      document.body.classList.toggle("dark-mode", this.state.darkMode);
    });
  };

  render() {
    const { darkMode } = this.state;

    return (
      <div className={darkMode ? "app dark" : "app"}>
        <Router>
          <Navbar toggleDarkMode={this.toggleDarkMode} />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News key="general2" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
          </Routes>

          {/* ✅ Add Back to Top Button */}
          <BackToTop />
        </Router>
      </div>
    );
  }
}
