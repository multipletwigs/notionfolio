import ArticleGrid from 'components/ArticleGrid';
import { SerifHeader } from 'components/SerifHeader';
import { siteMetaData } from 'data/siteMetadata';
import { BlogCardType, getBlogCardInfo } from 'lib/getBlogContent';
import { InferGetStaticPropsType } from 'next/types';
import React from 'react';
import { Container } from '../../layouts/Container';

/*
Exporting getStaticProps will allow you to share a state in that is called in lib. 
Whatever that is returned as props here will be passed down into the component below. 

getStaticProps: allows for ISR, where we only want the server to generate the content following 
a caching mechanism. This way your API doesn't get called every time the site gets rendered. 
*/
export async function getStaticProps() {
  const postItems: BlogCardType[] = await getBlogCardInfo(
    process.env.NOTION_BLOG_DB_ID as string
  );

  return {
    props: {
      postItems
    },
    revalidate: 60
  };
}

/**
 * The type of props must be of InferGetStaticPropsType<typeof getStaticProps>
 * This allows your TypeScript from getStaticProps to be inferred. You shouldn't
 * try to explicitly type this.
 */
const Blog = ({
  postItems
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const blogMeta = {
    ...siteMetaData,
    title: 'Zach Khong | Blog',
    headerTitle: "Zach's Blog",
    description:
      'A blog about my journey as a software engineer and my thoughts on tech.',
    siteUrl: 'https://zachkhong.com/blog'
  };
  return (
    <Container customMeta={blogMeta}>
      <SerifHeader
        title={'A documentation about my projects.'}
        footer_desc={'EVERYTHING I HAVE CREATED SO FAR'}
      />
      <ArticleGrid postItems={postItems}></ArticleGrid>
    </Container>
  );
};

export default Blog;
