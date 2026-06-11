'use client';

import { useEffect, useState } from 'react';
import { FeedbackProvider, useFeedback } from '../context/FeedbackContext';

function FeedbackUI() {
  const { feedbacks, fetchFeedbacks } = useFeedback();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const addFeedback = async () => {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });

    setName('');
    setMessage('');
    fetchFeedbacks();
  };

  const deleteFeedback = async (id) => {
    await fetch('/api/feedback', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    fetchFeedbacks();
  };

  return (
    <div>
      <h1>Student Feedback System</h1>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br /><br />

      <button onClick={addFeedback}>Add Feedback</button>

      <hr />

      {feedbacks.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.message}</p>
          <button onClick={() => deleteFeedback(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <FeedbackProvider>
      <FeedbackUI />
    </FeedbackProvider>
  );
}
