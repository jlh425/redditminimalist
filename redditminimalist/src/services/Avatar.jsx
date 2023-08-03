import { useState, useEffect } from 'react';
import axios from 'axios';


const Avatar = (props) => {
  const { name } = props;
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const imageUrl = `https://api.adorable.io/avatars/10/${name}`;
    
    axios.get(imageUrl)
      .then(response => {
        setAvatarUrl(response.config.url);
      })
      .catch(error => {
        console.error('Error fetching avatar:', error);
      });
  }, [name]);

  return (
    <img
      src={avatarUrl}
      alt={`${name} profile`}
      className="rounded-full h-20 mr-1"
    />
  );
};

export default Avatar;
