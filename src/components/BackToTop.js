import React, { useEffect, useState } from 'react';
import '../styles/BackToTop.css';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () =>
      window.scrollY > 300 ? setVisible(true) : setVisible(false);

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button className="back-to-top" onClick={scrollToTop}>
      ↑
    </button>
  ) : null;
};

export default BackToTop;
