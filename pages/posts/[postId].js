import Head from "next/head"
import { Date } from "../../components/date"

import { getAllPostsIds, getPostData } from "../../utils/posts"

import utilStyles from "../../styles/utils.module.css"

import Layout from "../../components/layout"

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.postId)

  return {
    props: {
      postData,
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllPostsIds()

  return {
    paths,
    fallback: false,
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
