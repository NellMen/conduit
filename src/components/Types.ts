import {ArticleType, UserProfile} from "../pages/Home/typesHome";

export interface ArticleActionsProps {
    article: ArticleType;
    userNameOrig: string;
    isFollowing: boolean;
    followersCount: number;
    isFavorited: boolean;
    favoritesCount: number;
    onFollow: () => void;
    onFavorite: () => void;
    onDelete: () => void;
    editInf: {
        body: string;
        description: string;
        tagList: string[];
        title: string;
        slug: string;
    };
}

export type ArticleCommentsProps = {
    slug: string;
    image: string;
}

export type comments = {
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
        followersCount: number;
    }
    body: string;
    createdAt: string
    id: number
    updatedAt: string
}

export interface ArticleMetaProps {
    article: ArticleType;
    defaultImage: string;
}

export type CommentProps = {
    onClickDeleteState: (commentId: number) => void;
    commentInfo: {
        commentInfo: {
            author: {
                username: string;
                bio: string;
                image: string;
                following: boolean;
                followersCount: number;
            };
            body: string;
            createdAt: string;
            id: number;
            updatedAt: string;
        };
    };
};

export interface ProfileInfoProps {
    usernameInfo: UserProfile;
}