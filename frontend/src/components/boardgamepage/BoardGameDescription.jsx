import { useState } from 'react';

const BoardGameDescription = ({ boardGame }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 500;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const description = boardGame.description || '';
  const isLongDescription = description.length > maxLength;

  return (
    <div>
      <h6 className="text-decoration-underline" style={{ color: 'var(--color-gray-purple)' }}>
        Περιγραφή
      </h6>
      <p
        className="text-muted"
        style={{
          fontSize: '14px',
          color: 'var(--color-gray-purple)',
        }}
        dangerouslySetInnerHTML={{
          __html: isExpanded || !isLongDescription
            ? description
            : `${description.substring(0, maxLength)}...`,
        }}
      />
      {isLongDescription && (
        <button
          onClick={toggleDescription}
          className="btn btn-link p-0 text-decoration-underline"
          style={{
            color: 'var(--color-orange)',
            fontSize: '14px',
            marginTop: '0', // Ensure no extra margin above the button
          }}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default BoardGameDescription;