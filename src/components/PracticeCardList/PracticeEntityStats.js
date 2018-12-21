import React from 'react';
import PropTypes from 'prop-types';
import './PracticeEntityStats.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

{
  /* -------Card Footer------ */
}
{
  /* Layout for counters */
}
const PracticeEntityStats = props => {
  return (
    <Grid container className="practice--card_footer">
      {Object.keys(props.labels).map((value, key) => {
        return (
          <Grid
            key={key}
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            className="practice--card-footer__columns-clinician"
            onClick={e =>
              props.handlers[value](e, props.counts[value], props.labels[value])
            }>
            <FontAwesomeIcon
              className="practice--card-footer-icon"
              icon={['fal', props.icon[value]]}
            />
            <Grid className="practice--card-footer__inner-content">
              <Typography className="singlecard-count">
                {props.counts[value]}
              </Typography>
              <Typography className="provider_groups">
                {props.labels[value]}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

PracticeEntityStats.defaultProps = {
  counts: {
    serviceCount: '173',
    tinCount: '28',
    locationCount: '170',
  },
  labels: {
    serviceCount: 'Clinician/s',
    tinCount: 'TIN/s',
    locationCount: 'Location/s',
  },
  icon: {
    serviceCount: 'stethoscope',
    tinCount: 'copy',
    locationCount: 'map-marker-alt',
  },
  handlers: {
    serviceCount: (e, label, count) => {
      e.stopPropagation();
      // console.log(('serviceCount is executed', e, label, count);
    },
    tinCount: (e, label, count) => {
      e.stopPropagation();
      // console.log(('tinCount is executed', e, label, count);
    },
    locationCount: (e, label, count) => {
      e.stopPropagation();
      // console.log(('locationCount is executed', e, label, count);
    },
  },
};

PracticeEntityStats.propTypes = {
  count: PropTypes.object,
  labels: PropTypes.object,
  icon: PropTypes.object,
  handlers: PropTypes.object,
};

export default PracticeEntityStats;
