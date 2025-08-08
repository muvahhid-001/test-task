import React from "react";
import { Card, Typography, Tag, Space } from "antd";
import type { Post } from "../model/types";

import styles from "./PostCard.module.scss";

const { Title, Paragraph, Text } = Typography;

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Card hoverable className={styles.card}>
      <div>
        <Title level={3} className={styles.title}>
          {post.title}
        </Title>
        <Paragraph ellipsis={{ rows: 3 }} className={styles.body}>
          {post.body}
        </Paragraph>
      </div>
      <div>
        <Space wrap className={styles.tags}>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
        <div className={styles.reactions}>
          <Text type="secondary">
            Лайков: {post.reactions.likes} | Дизлайков:{" "}
            {post.reactions.dislikes}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
