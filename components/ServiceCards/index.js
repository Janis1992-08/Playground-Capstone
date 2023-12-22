import { useState } from 'react';

export default function ServiceProvider({
  id,
  firstName,
  lastName,
  skills,
  needs,
  email,
  phone,
  onDelete
}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    setReviews([...reviews, newReview]);
    setNewReview('');
  };

  return (
    <div className="service-provider">
      <h2>{firstName} {lastName}</h2>
      <p><strong>Skills:</strong> {skills}</p>
      <p><strong>Needs:</strong> {needs}</p>

      {showContactInfo && (
        <div>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>
      )}

      <button onClick={toggleContactInfo}>
        {showContactInfo ? "Hide Contact" : "Show Contact"}
      </button>
      <button onClick={() => onDelete(id)}>Delete</button>

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.map((review, index) => (
          <p key={index}>{review}</p>
        ))}
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Add a review"
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}