import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } = this.props;

    console.log("Source prop value:", source);

    return (
      <div className="my-3">
        <div className="card">
          {source && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {source}
            </span>
          )}
          <img
            src={!imageurl ? "https://image.cnbcfm.com/api/v1/image/108114425-1741734596822-gettyimages-1096026706-1.jpeg?v=1741734632&w=1920&h=1080" : imageurl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More.....
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;