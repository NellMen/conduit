import {useEffect, useState} from 'react'
import {requests} from "../api";
import {useLocation, useNavigate} from "react-router-dom";
import {ArticleType} from "./Home/typesHome";
import {LocationState} from "./formTypes";


export const EditArticle = () => {
	const location = useLocation();
	const [articleTitle, setArticleTitle] = useState('')
	const [articleAbout, setArticleAbout] = useState('')
	const [articleDescription, setArticleDescription] = useState('')
	const [articleTags, setArticleTags] = useState<string[]>([])
	const [errorPublicArticle, setErrorPublicArticle] = useState(false)

	const initialData = (location.state as LocationState);

	const articleTagsNormal = articleTags.map(e => e.split(',').filter(tag => tag.trim() !== '')).join(',').split(',')

	useEffect(() => {
		if (initialData !== null) {
			setArticleTitle(initialData.title)
			setArticleAbout(initialData.body)
			setArticleDescription(initialData.description)
			setArticleTags(initialData.tagList)
		} else {
			setArticleTitle('')
			setArticleAbout('')
			setArticleDescription('')
			setArticleTags([])
		}
	}, [initialData])

	const navigate = useNavigate();

	const clickPostButton = async () => {
		if (initialData === null) {
			try {
				await requests.postArticle(articleTitle, articleAbout, articleDescription, articleTagsNormal)
				requests.getArticleInfo(articleTitle).then(res => {
					navigate(`/article/${res.data.article.slug}`, {
						state: res.data.article as ArticleType,
					})
				})

			} catch (e) {
				setErrorPublicArticle(true)
			}
		}
		if (initialData !== null) {
			try {
				await requests.putArticle(initialData.slug, articleTitle, articleAbout, articleDescription, articleTagsNormal)
				requests.getArticleInfo(articleTitle).then(res => {
					navigate(`/article/${res.data.article.slug}`, {
						state: res.data.article as ArticleType,
					})
				})
			} catch (e) {
				setErrorPublicArticle(true)
			}
		}
	}

	return (
		<div className='editor-page'>
			<div className='container page'>
				<div className='row'>
					<div className='col-md-10 offset-md-1 col-xs-12'>
						{
							errorPublicArticle &&
								<ul className='error-messages'>
									<li>That title is required</li>
								</ul>
						}
						<form>
							<fieldset>
								<fieldset className='form-group'>
								<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Article Title'
										onChange={e => setArticleTitle(e.target.value)}
										value={articleTitle}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder="What's this article about?"
										onChange={e => setArticleAbout(e.target.value)}
										value={articleAbout}
									/>
								</fieldset>
								<fieldset className='form-group'>
									<textarea
										className='form-control'
										rows={8}
										placeholder='Write your article (in markdown)'
										onChange={e => setArticleDescription(e.target.value)}
										value={articleDescription}
									></textarea>
								</fieldset>
								<fieldset className='form-group'>
									<input
										type='text'
										className='form-control'
										placeholder='Enter tags'
										onChange={e => {
											const tags = e.target.value
												.split(' ')
											setArticleTags(tags.filter((item, index) => tags.indexOf(item) === index));
										}}
										value={articleTags}
									/>

								</fieldset>
								<button
									className='btn btn-lg pull-xs-right btn-primary'
									type='button'
									onClick={() => {
										clickPostButton()
										setErrorPublicArticle(false)
									}}
								>
									{!initialData ? 'Publish Article' : 'Update Article'}

								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
