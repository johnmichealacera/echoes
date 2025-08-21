import React from 'react';
import './AddSongButton.css';

interface AddSongButtonProps {
  onClick: () => void;
}

const AddSongButton: React.FC<AddSongButtonProps> = ({ onClick }) => {
  return (
    <button className="add-song-btn" onClick={onClick} aria-label="Add new song">
      <span className="plus-icon">+</span>
      <span className="btn-text">Add Song</span>
    </button>
  );
};

export default AddSongButton;
