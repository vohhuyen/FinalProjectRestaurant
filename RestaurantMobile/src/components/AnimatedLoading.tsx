// LoadingSVG.tsx
import React from 'react';
import Svg, { Polyline } from 'react-native-svg';

const AnimatedLoading: React.FC = () => {
  return (
    <Svg width="34.875" height="46.938" viewBox="0 0 34.875 46.938" xmlns="http://www.w3.org/2000/svg">
      <Polyline
        fill="none"
        stroke="#C9AB81"
        strokeMiterlimit="10"
        points="0.5,0.003 0.5,36.438 22.875,36.438"
      />
      <Polyline
        fill="none"
        stroke="#C9AB81"
        strokeMiterlimit="10"
        points="6.5,5.003 6.5,41.438 28.875,41.438"
      />
      <Polyline
        fill="none"
        stroke="#C9AB81"
        strokeMiterlimit="10"
        points="12.5,10.003 12.5,46.438 34.875,46.438"
      />
    </Svg>
  );
};

export default AnimatedLoading;
