import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true,
    };
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;
  }

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = async () => {
    const { country, category, pageSize } = this.props;
    const { page } = this.state;

    this.setState({ loading: true });

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=f664c29487c448e7a449dd5015a55570&page=${page}&pageSize=${pageSize}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.articles || data.articles.length === 0) {
        this.setState({ hasMore: false });
        return;
      }

      this.setState((prevState) => ({
        articles: prevState.articles.concat(data.articles),
        totalResults: data.totalResults,
        loading: false,
        hasMore: prevState.articles.length + data.articles.length < data.totalResults,
      }));
    } catch (err) {
      console.error("Error fetching news:", err);
      this.setState({ loading: false, hasMore: false });
    }
  };

  fetchMoreData = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.loadArticles
    );
  };

  render() {
    const { articles, loading, hasMore } = this.state;
    const capitalizedCategory = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);

    return (
      <>
        <h1 className="text-center my-4">
          NewsMonkey Top Headlines from {capitalizedCategory}
        </h1>

        {loading && articles.length === 0 && (
          <div className="container">
            <div className="row">
              {[...Array(6)].map((_, i) => (
                <div className="col-md-4 my-3" key={i}>
                  <Skeleton height={300} />
                </div>
              ))}
            </div>
          </div>
        )}

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center", padding: "20px", color: "gray" }}>
              🎉 You've reached the end of the headlines.
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {articles.map((article) => (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title || ""}
                    description={article.description || ""}
                    imageurl={article.urlToImage}
                    newsurl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
