import React, { useEffect, useState } from 'react';
import { requests } from '../api';
import {useUppDispatch} from "../store/store";
import {setSettingsTagsInfo} from "../store/slices/settingsTagsRequests";


export const HomeTags: React.FC = () => {
	const [requestTags, setRequestTags] = useState(true);
	const [tags, setTags] = useState([]);


	useEffect(() => {
		requestTags &&
			requests.getTags().then(data => {
				setTags(data.tags.slice(0, 54));
				setRequestTags(false);
			});
	});

	const dispatch = useUppDispatch();

	const onClickTag = (e: string) => {
		dispatch(setSettingsTagsInfo(e))
	}

	return (
		<div className='col-md-3'>
			<div className='sidebar'>
				<p>Popular Tags</p>
				{!requestTags ? (
					tags.map((e: string, i) => (
						<button onClick={() => onClickTag(e)} className='tag-pill tag-default' key={i}>
							{e}
						</button>
					))
				) : (
					<p>Загрузка тегов</p>
				)}
			</div>
		</div>
	);
};
