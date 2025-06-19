import React, { Component } from "react";
import { motion } from "framer-motion";
import fallbackImg from "../assets/no-image.png";
import '../styles/NewsItem.css';

export class NewsItem extends Component {
  render() {
    const { title, description, imageurl, newsurl, author, date, source } = this.props;

    return (
      <motion.div
        className="my-3"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card news-card shadow-sm">
          {source && (
            <span className="badge bg-danger source-badge">
              {source}
            </span>
          )}
          <img
            src={imageurl || fallbackImg}
            alt="news"
            loading="lazy"
            className="card-img-top news-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImg;
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author || "NewsBot"} on {new Date(date).toDateString()}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary btn-sm read-more-btn"
            >
              Read More →
            </a>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default NewsItem;
