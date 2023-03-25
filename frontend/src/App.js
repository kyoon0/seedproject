import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login.js';
import SignUp from './components/pages/SignUp.js';
import Dashboard from './components/pages/Dashboard.js';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/sign-in" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
