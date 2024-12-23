import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from './interfaces';
import { StyleSheet } from 'react-native';

export const SearchIcon: React.FC<IconProps> = ({
  size = 20,
  fill = '#C9AB81',
}: IconProps) => {
  return (
    <Svg style={styles.icon} width={size} height={size} viewBox="0 0 39 40">
      <Path
        d="M26.1438 30.3091C6.81741 40.5273 -9.80152 16.4257 6.81743 3.41925C20.9154 -7.33668 43.2295 9.15577 30.1584 26.9031L38.6547 36.1353C38.9348 36.4639 39.3083 37.2646 38.5614 37.8383L36.5074 39.631C36.0405 39.9895 35.2936 40.3122 34.5467 39.4517L26.1438 30.3091ZM17.0874 28.7854C24.1001 28.7854 29.785 23.3678 29.785 16.6849C29.785 10.002 24.1001 4.58449 17.0874 4.58449C10.0748 4.58449 4.38986 10.002 4.38986 16.6849C4.38986 23.3678 10.0748 28.7854 17.0874 28.7854Z"
        fill={fill}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 2,
    right: 20,
    top: 20,
    width: 1,
    height: 1
  },
});
