export interface Article {
	articleInfo: {
		author: {
			username: string;
			bio: string;
			image: string;
			following: boolean;
			followersCount: number;
		};
		body: string;
		createdAt: string;
		description: string;
		favorited: boolean;
		favoritesCount: number;
		slug: string;
		tagList: string[];
		title: string;
		updatedAt: string;
	};
}

export interface UserProfile {
	username: string;
	bio: string | null;
	image: string | null;
	following?: boolean;
	followersCount?: number;
}

export interface ArticleType {
	author: {
		username: string;
		bio: string;
		image: string;
		following: boolean;
		followersCount: number;
	};
	body: string;
	createdAt: string;
	description: string;
	favorited: boolean;
	favoritesCount: number;
	slug: string;
	tagList: string[];
	title: string;
	updatedAt: string;
}

export interface FeedListProps {
	isGlobal: boolean;
}
