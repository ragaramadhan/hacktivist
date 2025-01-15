import NewsArticle from "../../../../components/news/NewsArticle";

interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  isSaved: boolean;
  tags: string[];
  relatedArticles: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
  }[];
}

type Props = {
  params: {
    id: string;
  };
};

type ArticleResponse = {
  statusCode: number;
  data: Article;
};

const comotDataArticle = async (id: string): Promise<ArticleResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogpost/${id}`, {
    method: "GET",
  });
  const responseJson = await response.json();
  // console.log(responseJson, "<<< 36");
  return responseJson;
};

const Page = async (props: Props) => {
  const article = await comotDataArticle(props.params.id);
  // console.log(props.params.id, "<<< 42");
  // console.log(article.data.author.name, "<<< 42");
  // return <NewsArticle article={{ data: article }} />;
  return <NewsArticle article={article} />;
};

export default Page;
