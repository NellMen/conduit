import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector, useUppDispatch} from "../store/store";
import {requests} from "../api";
import {Feed} from "../components/Feed";
import Pagination from "../components/Pagination";
import ProfileInfo from "../components/ProfileInfo";
import {UserProfile} from "./Home/typesHome";

export const Profile: React.FC = () => {
	const {username} = useParams<string>();

	const [feeds, setFeeds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [articlesCount, setArticlesCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const [profileMyArticles, setProfileMyArticles] = useState(true);

	const userNameOrig = useAppSelector(state => state.userInfoRequest);

	const [userData, setUserData] = useState<UserProfile>({username: ''  ,   bio: ''   ,  image:  '' ,    following: false,     followersCount: 0,})

	useEffect(() => {
		setIsLoading(true);

		requests.FeedsProfile(currentPage, profileMyArticles && `${username}`, !profileMyArticles && `${username}`)
			.then(data => {
				setArticlesCount(data.articlesCount);
				setFeeds(data.articles);
				if (userNameOrig.username === username) {
					setUserData(userNameOrig)
				} else {
					if (!!data.articles[0]) {
						setUserData(data.articles[0].author)
					} else {
						if (username !== undefined && profileMyArticles) {
							requests.profilesData(username).then(data => {
								setUserData(data.profile)
							})
								.catch((err) => <div>{err.message}</div>)
						}
					}
				}
			})
			.catch((err) => <div>{err.message}</div>)
			.finally(() => setIsLoading(false));

	}, [currentPage, profileMyArticles, username]);

	useEffect(() => {
		setProfileMyArticles(true)
	}, [username]);


	return (
		<div className='profile-page'>
			<div className='user-info'>
				<ProfileInfo usernameInfo={userData} />
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-xs-12 col-md-10 offset-md-1'>
						<div className='articles-toggle'>
							<ul className='nav nav-pills outline-active'>
								<li className='nav-item'>
									<a onClick={() => setProfileMyArticles(true)} className={profileMyArticles ? 'nav-link active' : 'nav-link'}>
										My Articles
									</a>
								</li>
								<li className='nav-item'>
									<a onClick={() => setProfileMyArticles(false)} className={!profileMyArticles ? 'nav-link active' : 'nav-link'}>
										Favorited Articles
									</a>
								</li>
							</ul>
						</div>

						{(isLoading) ? <div>Loading {username} articles...</div> : ''}
						{(feeds.length === 0 && !isLoading) ? <div>Articles not available.</div> : ''}

						{(!isLoading && feeds.length !== 0) && feeds.map((article, id) => <Feed key={id} articleInfo={article} />)}

						{(!isLoading && feeds.length !== 0) && (
							<Pagination
								currentPage={currentPage}
								onChangePage={setCurrentPage}
								count={articlesCount}
							/>
						)}

					</div>
				</div>
			</div>
		</div>
	);
};
