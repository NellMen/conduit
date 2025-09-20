import React, {useEffect, useState} from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import {requests} from "../api";
import {useAppSelector} from "../store/store";
import ArticleComments from "../components/ArticleComments";
import {ArticleType} from "./Home/typesHome";
import {ArticleMeta} from "../components/ArticleMeta";
import {ArticleActions} from "../components/ArticleActions";


const Article: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { nameArticle } = useParams();
    const userNameOrig = useAppSelector(state => state.userInfoRequest.username);

    const [article, setArticle] = useState<ArticleType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    const [isFavorited, setIsFavorited] = useState(false);
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                setError(false);

                let articleData: ArticleType;

                if (location.state) {
                    articleData = location.state as ArticleType;
                } else {
                    if (!nameArticle) {
                        throw new Error('Article name is required');
                    }

                    const response = await requests.getArticleInfo(nameArticle);
                    if (!response?.data?.article) {
                        throw new Error('Invalid article response');
                    }
                    articleData = response.data.article;
                }

                setArticle(articleData);
                setIsFollowing(articleData.author.following);
                setFollowersCount(articleData.author.followersCount);
                setIsFavorited(articleData.favorited);
                setFavoritesCount(articleData.favoritesCount);

            } catch (err) {
                console.error('Error fetching article:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [location.state, nameArticle]);

    const handleFollow = async () => {
        if (!userNameOrig) {
            alert("Please log in first");
            return;
        }

        if (!article) {
            return
        }
        try {
            if (isFollowing) {
                await requests.Unfollow(article.author.username);
                setFollowersCount(prev => prev - 1);
            } else {
                await requests.follow(article.author.username);
                setFollowersCount(prev => prev + 1);
            }
            setIsFollowing(prev => !prev);
        } catch (err) {
            console.error('Error updating follow status:', err);
            alert('Error updating follow status');
        }
    };

    const handleFavorite = async () => {
        if (!userNameOrig) {
            alert("Please log in first");
            return;
        }
        if (!article) {
            return
        }

        try {
            if (isFavorited) {
                await requests.deleteFavorite(article.slug);
                setFavoritesCount(prev => prev - 1);
            } else {
                await requests.favorite(article.slug);
                setFavoritesCount(prev => prev + 1);
            }
            setIsFavorited(prev => !prev);
        } catch (err) {
            console.error('Error updating favorite:', err);
            alert('Error updating favorite');
        }
    };

    const defaultImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAALCACAAIABAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAYBBAUHCAMC/8QANBAAAQQBAgQEBgEBCQAAAAAAAQACAwQFBhEHITFBCBJRYRMUcYGRoVIjFSJEYnJzgpKy/9oACAEBAAA/AJwiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi+69eW3YZBXiksWJOTIYWF73fQDmVKo+EmtpoPit0tkvJtvzjDT/wBSd/0o1kcbcxFt1W/Uno2m9YbMZjf9dirdERXmJwuQz9r5bGULORsDrHViMhH126fdZ+zwn1pTgM0ulskIwNyWxB5A+jST+lFXsdFK+KRjo5WHZ8b2lrmn0IPMKiIiLM6P0rd1tqOlhseAJ7Lucjhu2Jg5ue72A/J2Hddg6W0bprhJp+WSD4NOOJnmt5S24CST3c89B6NHL0Cjk/iU0NDcMIt3pmb7fMx03GP689iR9lI8yzR/E/R0tm7Yp5LBhjnm6HhprbDm4O6xuHvt7hcUTCMTyiF7pIQ9wje4bFzNz5SR2JGxXwivsFBRtZzHQ5Od1XGyWI2Wp2dY4i4Bzh6cu/bqu0pcjpPhRpiH+tTwuIA/pCPmZjt1AG7pHH15qMY/xI6Hu3BC67bpAnYT2qrmx/cjfYe5WY19w0wHFPDtlf8ABbcdH5qmXrbOcNxy3I5PYfQ/bYrjzOYS5pvM3MVkIvg3akpilaOm46EeoI2IPoVYoiLMaS1bk9E5yHLYmZsNqMFhD2+ZkjD1Y4dwdh+As7xF4tZviYKsWRbBUpVj52U6nmDHP/m7ckuI7eihSqHODHsDnBj9vO0OIDtum47/AHVERFVznODA5znBg8rA5xPlHoN+g+iop7w+40Z/hzjJ8dRZWu0XuL44LgcRA89SzYjkepb0358tyoln89f1RmbWVyc5s3rLvNJJtsOQ2AA7AAAAeyx6IiIiIiIiIiIiIi2Dwj4Rz8ULVyR93+z8ZTLWSzMaHyOe4bhrQeXTmSfZWPE3hblOGmT8lkG3ipnbVsi1uzX/AOV/8X+3ft7QxERbK4ScFrvEWUXrpmx2nmf4loAksO/jFuNtvV223Yb9sfxd4Yu4Y56vWjt/O0Lkbpa0jwBIA0gOa8DluNxzHXf2UFRERERSnh5xFynDfNfO0CJq0uzbVKR2zJ2j/wAuHPZ3b3C6x0prbTXFjByxVjDcZIzy2sXcYDJH7PYeo9HDce615qzwtYrISPn09kpMQ93P5Sy0zQD2ad/M0fcrX9zwy61rSEQjG3G9nR2vL+nNC9cd4YNYW3j5qfGY9ndz53SkfZref5WzdG+GfT2Bljs5iaTUNppBEUrPh1gf9sEl3/IkeykfEXi9geGtP5dzmXMqGAQYusQC0dvPtyjb+/QFclas1Zk9bZyfLZaf41qX+6Gt5MiYOjGDs0fvqeaxCIiIiIvWpbnoWo7NWeWrZiO8c8Dyx7D7OHMLaWm/Erq7CRsivCrnYW8t7TPhzbf62dfuCppW8WdQxj5nS9lsnf4Ftjm/sBed7xaR/DIo6XkL/W1cAH4a0qAao8QWstSxvhjuRYas7kY8awseR7yEl342WuHEue57iXPcfM5zjuXH1JPUqiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIv/9k='

    if (!article) {

    }

    const editInf = article ? {
        body: article.body,
        description: article.description,
        tagList: article.tagList,
        title: article.title,
        slug: article.slug
    } : null;

    if (loading) return <div className="article-page">Loading...</div>;
    if (error) return <div className="article-page">Error loading article</div>;

    const onClickDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this article?")) {
            return;
        }
        if (!article) {
            return
        }
        try {
            await requests.deleteArticle(article.slug)
            navigate('/')
        } catch (e) {
            console.log(e + "ошибка в удалении")
        }
    }

    if (!article) {
        return null
    }
    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>
                    <div className="article-meta">
                        <ArticleMeta
                            article={article}
                            defaultImage={defaultImage}
                        />
                        {editInf &&
                            <ArticleActions
                                article={article}
                                userNameOrig={userNameOrig}
                                isFollowing={isFollowing}
                                followersCount={followersCount}
                                isFavorited={isFavorited}
                                favoritesCount={favoritesCount}
                                onFollow={handleFollow}
                                onFavorite={handleFavorite}
                                onDelete={onClickDelete}
                                editInf={editInf}
                            />
                        }

                    </div>
                </div>
            </div>
            <div className="container page">
                <div className="row article-content">
                <div className="col-md-12">
                <p>{article.body}</p>
                <div className="tag-list">
                {article.tagList.filter(tag => tag.trim() !== '').map(tag => (
                                <span key={tag} className="tag-default tag-pill tag-outline">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="article-actions">
                    <div className="article-meta">
                        <ArticleMeta
                            article={article}
                            defaultImage={defaultImage}
                        />
                        {editInf &&
                            <ArticleActions
                                article={article}
                                userNameOrig={userNameOrig}
                                isFollowing={isFollowing}
                                followersCount={followersCount}
                                isFavorited={isFavorited}
                                favoritesCount={favoritesCount}
                                onFollow={handleFollow}
                                onFavorite={handleFavorite}
                                onDelete={onClickDelete}
                                editInf={editInf}
                            />
                        }
                    </div>
                </div>
                <ArticleComments slug={article.slug} image={article.author.image}/>
            </div>
        </div>
    )
}

export default Article;