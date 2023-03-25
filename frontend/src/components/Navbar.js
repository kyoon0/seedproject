import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button.js';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);
	const onLogOut = () => {
		dispatch(logout());
		dispatch(reset());
		setClick(false);
		navigate('/');
	};
	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};
	useEffect(() => {
		showButton();
	});

	window.addEventListener('resize', showButton);
	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
						<i className="fa-solid fa-seedling"></i>
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>
					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<li className="nav-item">
							<Link to="/home" className="nav-links" onClick={closeMobileMenu}>
								Home
							</Link>
						</li>
						{user ? (
							<>
								<li className="nav-item">
									<Link to="/" className="nav-links" onClick={onLogOut}>
										Logout
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link to="/sign-in" className="nav-links" onClick={closeMobileMenu}>
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu} target="_blank">
										Get Seed
									</Link>
								</li>
							</>
						)}
					</ul>
					{user ? <></> : <>{button && <Button buttonStyle="btn--outline">Get Seed</Button>}</>}
				</div>
			</nav>
		</>
	);
}

export default Navbar;
