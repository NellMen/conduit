import { Link } from "react-router-dom";
import {ArticleActionsProps} from "./Types";

export const ArticleActions = ({
                                  article,
                                  userNameOrig,
                                  isFollowing,
                                  followersCount,
                                  isFavorited,
                                  favoritesCount,
                                  onFollow,
                                  onFavorite,
                                  onDelete,
                                  editInf
                              }: ArticleActionsProps) => {
    return (
        <>
            {userNameOrig !== article.author.username && (
                <>
                    <button
                        onClick={onFollow}
                        className="btn btn-sm btn-outline-secondary"
                    >
                        <i className="ion-plus-round"></i>
                        {isFollowing ? 'Unfollow' : 'Follow'} {article.author.username}
                        <span className="counter">({followersCount})</span>
                    </button>

                    <button
                        onClick={onFavorite}
                        className={`btn btn-sm btn-outline-primary ${isFavorited ? 'active' : ''}`}
                    >
                        <i className="ion-heart"></i>
                        {isFavorited ? 'Favorited' : 'Favorite'}
                        <span className="counter">({favoritesCount})</span>
                    </button>
                </>
            )}

            {userNameOrig === article.author.username && (
                <>
                    <Link
                        className="btn btn-sm btn-outline-secondary"
                        to={`/editArticle`}
                        state={editInf}
                    >
                        <i className="ion-edit"></i> Edit Article
                    </Link>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={onDelete}
                    >
                        <i className="ion-trash-a"></i> Delete Article
                    </button>
                </>
            )}
        </>
    );
};