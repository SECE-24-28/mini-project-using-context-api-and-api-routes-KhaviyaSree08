'use client';

import { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch('/api/feedback');
    const data = await res.json();
    setFeedbacks(data);
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, fetchFeedbacks }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);
