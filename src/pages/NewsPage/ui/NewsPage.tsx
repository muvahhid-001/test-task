import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "@entities/post/model/postsSlice";
import type { RootState, AppDispatch } from "@app/store";
import { useIntersection } from "@shared/lib/useIntersection";

import styles from "./NewsPage.module.scss";
import { Typography, Spin } from "antd";
import { NewsList } from "@widgets/NewsList/ui/NewsList";

const { Title } = Typography;

const NewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, hasMore, skip } = useSelector(
    (state: RootState) => state.posts
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(loadPosts(skip));
    }
  }, [loading, hasMore, skip, dispatch]);

  useEffect(() => {
    dispatch(loadPosts(0));
  }, [dispatch]);

  useIntersection(sentinelRef, handleLoadMore, !loading && hasMore);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title level={2}>Лента новостей</Title>

          <NewsList posts={items} />

          {loading && (
            <Spin style={{ display: "block", margin: "20px auto" }} />
          )}

          <div ref={sentinelRef} style={{ height: 1 }} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
