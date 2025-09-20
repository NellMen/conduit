import React, {useEffect, useState} from "react";
import {useAppSelector} from "../store/store";
import Pagination from "./Pagination";
import {Feed} from "./Feed";
import {requests} from "../api";
import {FeedListProps} from "../pages/Home/typesHome";


export const HomFeeds: React.FC<FeedListProps> = ({ isGlobal = false }) => {
    const [feeds, setFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [articlesCount, setArticlesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const clickedTag = useAppSelector(state => state.settingsTagReq.tagName);

    useEffect(() => {
        setCurrentPage(0)
    }, [isGlobal]);

    useEffect(() => {
        if (clickedTag.length !== 0) {
            isGlobal = false
        }
    }, [clickedTag]);

    useEffect(() => {
        setIsLoading(true);

        requests.GlobalFeeds(currentPage, clickedTag || '', isGlobal, false, false)
            .then(data => {
                setArticlesCount(data.articlesCount);
                setFeeds(data.articles);
            })
            .catch((err) => <div>{err.message}</div>)
            .finally(() => setIsLoading(false));
    }, [currentPage, clickedTag, isGlobal]);

    if (isLoading) return <div>Загрузка feeds...</div>;
    if (feeds.length === 0) return <div>Articles not available.</div>;

    return (
        <>
            {feeds.map((article, id) => (
                <Feed key={id} articleInfo={article} />
            ))}
            <Pagination
                currentPage={currentPage}
                onChangePage={setCurrentPage}
                count={articlesCount}
            />
        </>
    );
};
