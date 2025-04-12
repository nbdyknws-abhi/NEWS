import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  //static var for proptypes using
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
    };
    document.title=`${this.props.category}-NewsMonkey`;
    //title changing using props
  }
  async updatenews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f664c29487c448e7a449dd5015a55570&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.updatenews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatenews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updatenews();
  };
  fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f664c29487c448e7a449dd5015a55570&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      loading: true,
    });
  };
// Closing the render method and class properly
render() {
  return (
    <>
      <h1 className="text-center">NewsMonkey Top Headlines from {this.props.category}</h1>
      {this.state.loading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
} // Properly closing the render method here

} // Closing the class definition here

export default News;

