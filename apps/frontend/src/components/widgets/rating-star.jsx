import React, { memo } from 'react';
import PropTypes from 'prop-types';

// Default Filled & Unfilled Icons
const DefaultFillIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="#FFD329">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" />
  </svg>
);

const DefaultUnfillIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z"
      stroke="#FFD329" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RatingStar = memo(function RatingStar({
  totalStars = 5,
  value = 0,
  activeColor = '#FFD329',
  inactiveColor = '#ddd',
  size = 24,
  readOnly = false,
  fillIcon = DefaultFillIcon,
  unfillIcon = DefaultUnfillIcon,
  onChange = () => {},
  className = '',
  ...rest
}) {
  const handleClick = (index) => {
    if (!readOnly) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`rating-star ${className}`} {...rest} style={{ display: 'inline-flex', gap: '4px' }}>
      {Array.from({ length: totalStars }).map((_, index) => (
        <span
          key={index}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            width: size,
            height: size,
            display: 'inline-block',
            color: index < value ? activeColor : inactiveColor,
          }}
          onClick={() => handleClick(index)}
        >
          {index < value ? fillIcon : unfillIcon}
        </span>
      ))}
    </div>
  );
});

RatingStar.propTypes = {
  totalStars: PropTypes.number,
  value: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  size: PropTypes.number,
  readOnly: PropTypes.bool,
  fillIcon: PropTypes.node,
  unfillIcon: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default RatingStar;
