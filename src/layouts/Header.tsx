import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
	const [BurgerMenuClick, setBurgerMenuClick] = useState('');

	useEffect(() => {
		window.location.pathname == '/'
			? setBurgerMenuClick('0')
			: window.location.pathname == '/login'
			? setBurgerMenuClick('1')
			: setBurgerMenuClick('2');
	});

	return (
		<nav className='navbar navbar-light'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					conduit
				</Link>
				<ul className='nav navbar-nav pull-xs-right'>
					<li className='nav-item'>
						<Link
							onClick={() => setBurgerMenuClick('0')}
							className={BurgerMenuClick === '0' ? 'nav-link active' : 'nav-link'}
							to='/'
						>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							onClick={() => setBurgerMenuClick('1')}
							className={BurgerMenuClick === '1' ? 'nav-link active' : 'nav-link'}
							to='/login'
						>
							Sign in
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							onClick={() => setBurgerMenuClick('2')}
							className={BurgerMenuClick === '2' ? 'nav-link active' : 'nav-link'}
							to={'/register'}
						>
							Sign up
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
