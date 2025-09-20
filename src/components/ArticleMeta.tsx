import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import {ArticleMetaProps} from "./Types";


export const ArticleMeta = ({ article, defaultImage }: ArticleMetaProps) => {
    return (
        <>
            <Link to={`/profile/${article.author.username}`}>
                <img
                    src={article.author.image || defaultImage}
                    alt={article.author.username}
                />
            </Link>
            <div className="info">
                <Link to={`/profile/${article.author.username}`} className="author">
                    {article.author.username}
                </Link>
                <span className="date">
                    {format(parseISO(article.createdAt), 'd MMMM yyyy', {locale: ru})}
                </span>
            </div>
        </>
    );
};


