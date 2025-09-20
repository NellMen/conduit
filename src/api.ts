import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://conduit-realworld-example-app.fly.dev/api/',
});


instance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export const requests = {
	async signUp(email: string, username: string, password: string) {
		try {
			const response = await instance.post('/users', {
				user: { password, email, username },
			});
			if (response.data.user && response.data.user.token) {
				localStorage.setItem('token', response.data.user.token);
			}
			return response.data.user;
		} catch (error) {
			console.error('Sign-up error:', error);
			throw error;
		}
	},

	async singIn(email: string, password: string) {
		try {
			const response = await instance.post('/users/login', {
				user: { email, password },
			});
			if (response.data.user && response.data.user.token) {
				localStorage.setItem('token', response.data.user.token);
			}
			return response.data;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	},

	async login() {
		const response = await instance.get('/user');
		console.log(response.data.user);
		return response.data.user;
	},

	async getTags() {
		try {
			const response = await instance.get('/tags');
			return response.data;
		} catch (error) {
			console.error('Get tags error:', error);
			throw error;
		}
	},



	async GlobalFeeds(offset: number, tagName: string, yourOrGlobalFeeds: boolean, author: false | string, favorited: false | string) {
		const response = await instance.get(`/articles${yourOrGlobalFeeds ? '/feed' : ''}?${author ? `author=${author}&` : ''}${favorited ? `favorited=${favorited}&` : ''}limit=3&offset=${offset}${!yourOrGlobalFeeds ? `&tag=${tagName}` : ''}`);
		return response.data;
	},

	async FeedsProfile(offset: number, author: false | string, favorited: false | string) {
		const response = await instance.get(`/articles?${author ? `author=${author}&` : ''}${favorited ? `favorited=${favorited}&` : ''}&limit=3&offset=${offset}`);
		return response.data;
	},

	async profilesData(name: string) {
		const response = await instance.get(`/profiles/${name}`);
		return response.data;
	},

	async favorite(nameArticle: string) {
		await instance.post(`/articles/${nameArticle}/favorite`);
	},

	async deleteFavorite(nameArticle: string) {
		await instance.delete(`/articles/${nameArticle}/favorite`);
	},

	async settings(
		image: string,
		username: string,
		bio: string,
		email: string,
		password: string
	): Promise<undefined> {
		try {
			await instance.put('/user', {
				user: {
					bio,
					email,
					image,
					username,
					password
				}
			});
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async follow(nameArticle: string) {
		await instance.post(`/profiles/${nameArticle}/follow`);
	},
	async Unfollow(nameArticle: string) {
		await instance.delete(`/profiles/${nameArticle}/follow`);
	},
	async comments(slug: string) {
		return await instance.get(`/articles/${slug}/comments`);
	},
	async postComments(slug: string, comment: string) {
		await instance.post(`/articles/${slug}/comments`, {
			comment: {body: comment}
		});
	},
	async deleteComment(slug: string, idComment: number) {
		await instance.delete(`/articles/${slug}/comments/${idComment}`);
	},
	async postArticle(title: string, body: string, description: string, tagList: string[]) {
		await instance.post('/articles', {
			article: {
				body: body,
				description: description,
				tagList: tagList,
				title: title
			}
		})
	},
	async getArticleInfo(slug: string) {
		return await instance.get(`articles/${slug}`)
	},
	async deleteArticle(slug: string) {
		await instance.delete(`articles/${slug}`)
	},
	async putArticle(slug: string, title: string, body: string, description: string, tagList: string[]) {
		await instance.put(`/articles/${slug}`, {
			article: {
				body: body,
				description: description,
				tagList: tagList,
				title: title
			}
		})
	}
};
  