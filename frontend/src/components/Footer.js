import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
	return (
		<>
			<div className="footer-container">
				{/* <section className="footer-subscription">
					<p className="footer-subscription-header">Join the Adventure newsletter to receive our best vacation deals</p>
					<p className="footer-subscription-text">You can unsubscribe at any time.</p>
					<div className="input-areas">
						<form className="subscribe">
							<input type="email" name="email" placeholder="Your Email" className="footer-input" />
							<Button buttonStyle="btn--outline">Subscribe</Button>
						</form>
					</div>
				</section> */}

				<div className="footer-links">
					<div className="footer-link-wrapper">
						<div className="footer-link-items">
							<h2>About Us</h2>
							<Link to="/">Login</Link>
							<Link to="/">Register</Link>
							<Link to="/">How It Works</Link>
							<Link to="/">Blog</Link>
							<Link to="/">Terms of Service</Link>
						</div>
						{/* <div className="footer-link-items">
							<h2>Contact Us</h2>
							<Link to="/">How it works</Link>
							<Link to="/">Testimonials</Link>
							<Link to="/">Careers</Link>
							<Link to="/">Investors</Link>
							<Link to="/">Terms of Service</Link>
						</div> */}
					</div>
					{/* <div className="footer-link-wrapper">
						<div className="footer-link-items">
							<h2>Videos</h2>
							<Link to="/">How it works</Link>
							<Link to="/">Testimonials</Link>
							<Link to="/">Careers</Link>
							<Link to="/">Investors</Link>
							<Link to="/">Terms of Service</Link>
						</div>
						<div className="footer-link-items">
							<h2>Social Media</h2>
							<Link to="/">How it works</Link>
							<Link to="/">Testimonials</Link>
							<Link to="/">Careers</Link>
							<Link to="/">Investors</Link>
							<Link to="/">Terms of Service</Link>
						</div>
					</div> */}
				</div>

				<section className="social-media">
					<div className="social-media-wrap">
						<div className="footer-logo">
							<Link to="/" className="social-logo">
								<i className="fa-solid fa-seedling"></i>
							</Link>
							<small className="website-rights">SEED © 2023</small>
						</div>

						<div className="social-icons">
							<Link className="social-icon-link facebook" to="/" target="_blank" aria-label="Facebook">
								<i className="fa-brands fa-facebook-f"></i>
							</Link>
							<Link className="social-icon-link instagram" to="/" target="_blank" aria-label="Instagram">
								<i className="fa-brands fa-instagram"></i>
							</Link>
							<Link className="social-icon-link twitter" to="/" target="_blank" aria-label="Twitter">
								<i className="fa-brands fa-twitter"></i>
							</Link>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

export default Footer;
