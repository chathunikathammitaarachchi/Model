import  { useState, useEffect } from 'react';
import axios from 'axios';
import './review.css';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddReview = async () => {
    try {
      if (newReview.trim() !== '') {
        const response = await axios.post('http://localhost:5000/reviews', {
          text: newReview,
          rating: parseInt(rating),
        });
        setReviews([...reviews, response.data]);
        setNewReview('');
        setRating(1);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdateReview = async (id, updatedText) => {
    try {
      const updatedReview = reviews.find((review) => review._id === id);
      updatedReview.text = updatedText;

      await axios.put('http://localhost:5000/reviews/${id}, updatedReview');
      setReviews([...reviews]);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="App">
      <h1>Review and Rating System</h1>
      <div className="add-review">
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
        <button onClick={handleAddReview}>Add Review</button>
      </div>

      <div className="reviews">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <p>
              <strong>Rating:</strong> {review.rating} ⭐
            </p>
            <textarea
              defaultValue={review.text}
              onBlur={(e) => handleUpdateReview(review._id, e.target.value)}
            />
            <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;