import React, { useState } from 'react';
import { useAppSelector, useUppDispatch } from '../../store/store';
import { HomeTags } from '../../components/HomTags';
import {removeSettingTag} from "../../store/slices/settingsTagsRequests";
import { HomFeeds } from "../../components/HomFeeds";


export const Index: React.FC = () => {
	const [ButtonFeed, SetButtonFeed] = useState(0);

	const dispatch = useUppDispatch();

	const clickedTag = useAppSelector(state => state.settingsTagReq.tagName)
	const isAuthenticated = useAppSelector(state => state.userInfoRequest.username);


	return (
		<div className='home-page'>
			<div className='banner'>
				<div className='container'>
					<h1 className='logo-font'>conduit</h1>
					<p>A place to share your knowledge.</p>
				</div>
			</div>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-9'>
						<div className='feed-toggle'>
							<ul className='nav nav-pills outline-active'>
								{localStorage.length !== 0 && (
									<li className='nav-item'>
										<a
											className={ButtonFeed === 0 && !clickedTag ? 'nav-link active' : 'nav-link'}
											onClick={() => {
												SetButtonFeed(0)
												dispatch(removeSettingTag())
											}}
										>
											Your Feed
										</a>
									</li>
								)}

								<li className='nav-item'>
									<a
										className={(ButtonFeed === 1 && !clickedTag) || (!isAuthenticated && !clickedTag) ? 'nav-link active' : 'nav-link'}
										onClick={() => {
											SetButtonFeed(1)
											dispatch(removeSettingTag())
										}}
									>
										Global Feed
									</a>
								</li>
								{clickedTag && (
									<li className='nav-item'>
										<a className='nav-link active'>
											{clickedTag}
										</a>
									</li>
								)}
							</ul>
						</div>
						{ButtonFeed === 1 || !isAuthenticated ? <HomFeeds isGlobal={false} /> : <HomFeeds isGlobal={true}/>}
					</div>
					<HomeTags />
				</div>
			</div>
		</div>
	);
};
