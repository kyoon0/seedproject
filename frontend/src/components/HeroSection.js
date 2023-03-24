import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
// import CardItem from './CardItem';
// import './Cards.css';

function HeroSection() {
	// const test = 'Get Started';
	return (
		<>
			<div className="hero-container">
				<div className="left-container">
					<h1>Earn more. Learn more.</h1>
					<p>What are you waiting for?</p>
					<div className="hero-btns">
						<Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large">
							GET STARTED
						</Button>
					</div>
				</div>
				<div className="right-container">
					<div className="photo-container">
						<img alt="img" src="images/chores-3.png" path="/" />
						<img alt="img" src="images/chores-1.png" path="/" />
					</div>
				</div>
			</div>
		</>
	);
}

export default HeroSection;
