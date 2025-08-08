import React from "react";
import { List } from "antd";
import type { Post } from "@entities/post/model/types";
import PostCard from "@entities/post/ui/PostCard";

import styles from "./NewsList.module.scss";

export const NewsList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <List
      dataSource={posts}
      renderItem={(item) => (
        <List.Item className={styles.listItem} key={item.id}>
          <PostCard post={item} />
        </List.Item>
      )}
    />
  );
};
