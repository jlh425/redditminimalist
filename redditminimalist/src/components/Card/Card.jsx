
import './Card.css';
import PropTypes from 'prop-types';

const Card = (props) => {
  Card.propTypes = {
    children: PropTypes.node.isRequired,
  };
 {console.log(props.children)}
  return (
       <div className='card-card'>{props.children}</div>
)};

export default Card;

