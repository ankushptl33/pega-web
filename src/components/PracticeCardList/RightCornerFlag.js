import React from 'react';
import PropTypes from 'prop-types';
//import {Label} from 'semantic-ui-react'
import './rightcornerflag.less';
import Chip from '@material-ui/core/Chip';

/**
 * Right side corner label for any master component with four corners, example card,
 * square, rectangle. Usage example showing whether an entity is - Active or Inactive
 */
const RightCornerFlag = props => {
  return (
    <div className="status-label">
      <span className="status-lable__status">{props.currentStatus}</span>
    </div>
  );
};

RightCornerFlag.defaultProps = {
  currentStatus: 'Active',
};

RightCornerFlag.propTypes = {
  currentStatus: PropTypes.string,
};

export default RightCornerFlag;
