import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useUppDispatch } from '../store/store';
import { removeUser } from '../store/slices/userInfoRequest';

export const HeaderActive: React.FC = () => {
	const dispatch = useUppDispatch();
	const userInfo = useAppSelector(state => state.userInfoRequest);
	const navigate = useNavigate();
	const location = useLocation();
	const [activeLink, setActiveLink] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		switch(location.pathname) {
			case '/':
				setActiveLink('home');
				break;
			case '/editArticle':
				setActiveLink('newArticle');
				break;
			default:
				setActiveLink('');
		}
	}, [location.pathname, userInfo.username]);

	const handleLogout = () => {
		navigate('/');
		dispatch(removeUser());
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
		setIsDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		if (!isHovered) {
			setIsDropdownOpen(false);
		}
	};

	const getLinkClass = (linkName: string) =>
		`nav-link${activeLink === linkName ? ' active' : ''}`;

	return (
		<nav className='navbar navbar-light'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					conduit
				</Link>
				<ul className='nav navbar-nav pull-xs-right'>
					<li className='nav-item'>
						<Link className={getLinkClass('home')} to='/'>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link className={getLinkClass('newArticle')} to={`/editArticle`}>
							<i className='ion-compose'></i>New Article
						</Link>
					</li>

					<li
						className="nav-item dropdown"
						ref={dropdownRef}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div
							className="nav-link dropdown-toggle cursor-pointer"
							onClick={toggleDropdown}
						>
							<img
								alt={userInfo.username}
								className="user-pic"
								src={userInfo.image || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAALCACAAIABAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAYBBAUHCAMC/8QANBAAAQQBAgQEBgEBCQAAAAAAAQACAwQFBhEHITFBCBJRYRMUcYGRoVIjFSJEYnJzgpKy/9oACAEBAAA/AJwiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi+69eW3YZBXiksWJOTIYWF73fQDmVKo+EmtpoPit0tkvJtvzjDT/wBSd/0o1kcbcxFt1W/Uno2m9YbMZjf9dirdERXmJwuQz9r5bGULORsDrHViMhH126fdZ+zwn1pTgM0ulskIwNyWxB5A+jST+lFXsdFK+KRjo5WHZ8b2lrmn0IPMKiIiLM6P0rd1tqOlhseAJ7Lucjhu2Jg5ue72A/J2Hddg6W0bprhJp+WSD4NOOJnmt5S24CST3c89B6NHL0Cjk/iU0NDcMIt3pmb7fMx03GP689iR9lI8yzR/E/R0tm7Yp5LBhjnm6HhprbDm4O6xuHvt7hcUTCMTyiF7pIQ9wje4bFzNz5SR2JGxXwivsFBRtZzHQ5Od1XGyWI2Wp2dY4i4Bzh6cu/bqu0pcjpPhRpiH+tTwuIA/pCPmZjt1AG7pHH15qMY/xI6Hu3BC67bpAnYT2qrmx/cjfYe5WY19w0wHFPDtlf8ABbcdH5qmXrbOcNxy3I5PYfQ/bYrjzOYS5pvM3MVkIvg3akpilaOm46EeoI2IPoVYoiLMaS1bk9E5yHLYmZsNqMFhD2+ZkjD1Y4dwdh+As7xF4tZviYKsWRbBUpVj52U6nmDHP/m7ckuI7eihSqHODHsDnBj9vO0OIDtum47/AHVERFVznODA5znBg8rA5xPlHoN+g+iop7w+40Z/hzjJ8dRZWu0XuL44LgcRA89SzYjkepb0358tyoln89f1RmbWVyc5s3rLvNJJtsOQ2AA7AAAAeyx6IiIiIiIiIiIiIi2Dwj4Rz8ULVyR93+z8ZTLWSzMaHyOe4bhrQeXTmSfZWPE3hblOGmT8lkG3ipnbVsi1uzX/AOV/8X+3ft7QxERbK4ScFrvEWUXrpmx2nmf4loAksO/jFuNtvV223Yb9sfxd4Yu4Y56vWjt/O0Lkbpa0jwBIA0gOa8DluNxzHXf2UFRERERSnh5xFynDfNfO0CJq0uzbVKR2zJ2j/wAuHPZ3b3C6x0prbTXFjByxVjDcZIzy2sXcYDJH7PYeo9HDce615qzwtYrISPn09kpMQ93P5Sy0zQD2ad/M0fcrX9zwy61rSEQjG3G9nR2vL+nNC9cd4YNYW3j5qfGY9ndz53SkfZref5WzdG+GfT2Bljs5iaTUNppBEUrPh1gf9sEl3/IkeykfEXi9geGtP5dzmXMqGAQYusQC0dvPtyjb+/QFclas1Zk9bZyfLZaf41qX+6Gt5MiYOjGDs0fvqeaxCIiIiIvWpbnoWo7NWeWrZiO8c8Dyx7D7OHMLaWm/Erq7CRsivCrnYW8t7TPhzbf62dfuCppW8WdQxj5nS9lsnf4Ftjm/sBed7xaR/DIo6XkL/W1cAH4a0qAao8QWstSxvhjuRYas7kY8awseR7yEl342WuHEue57iXPcfM5zjuXH1JPUqiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIv/9k='}
							/>
							{userInfo.username}
						</div>
						<div
							className={'dropdown-menu'}
							onMouseEnter={() => setIsHovered(false)}
							onMouseLeave={handleMouseLeave}
							style={isDropdownOpen ? {display: 'block'} : {display: 'none'}}
						>
							<Link
								className='dropdown-item'
								to={`/profile/${userInfo.username}`}
							>
								{userInfo.username}
							</Link>
							<Link
								className='dropdown-item'
								to='/profile/settings'
							>
								<i className='ion-gear-a'></i>Settings
							</Link>
							<div className="dropdown-divider"></div>
							<Link
								className='dropdown-item'
								to='/'
								onClick={() => {
									handleLogout();
									setIsDropdownOpen(false);
								}}
							>
								Logout
							</Link>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};