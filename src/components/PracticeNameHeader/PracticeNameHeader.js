import Moment from 'react-moment';

import { Grid, Paper, Card, Avatar, Chip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './PracticeNameHeader.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const practiceLogo = '../../assets/svg/user_profile.png';
const agreementIcon = '../../assets/svg/agreement_icon.svg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  image: {
    width: 50,
    height: 50,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const PracticeNameHeader = props => {
  const { classes } = props;
  return (
    <Grid item className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <img className="practiceinfoheader-logo" src={practiceLogo} />
        </Grid>

        <Grid item xs={12} sm container className="practice-header-group">
          <Grid item xs container direction="column" spacing={16}>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography variant="h6">
                    {props.data.name}
                  </Typography>
                </Grid>
                <Grid item className="status-paid-icon">
                  <Typography
                    className="singlecard-payment__status__PracticeNameHeader"
                    circular>
                    Paid
                  </Typography>
                </Grid>
                <Grid item className="status-paid-icon">
                  <Typography
                    className="singlecard-status__circular-PracticeNameHeader"
                    circular>
                    Practice Status:{props.data.practiceStatus}
                  </Typography>
                </Grid>
                <Grid item className="status-paid-icon">
                  <FontAwesomeIcon
                    icon={['fal', 'file-contract']}
                    className="singlecard-stamp"
                  />
                </Grid>
              </Grid>
              <Typography variant="body2">
                <span className="createdon">
                  Created On:{' '}
                  <Moment date={props.dates.Created} format="DD MMM YYYY" />
                </span>
                <span className="updatedon">
                  Updated On:{' '}
                  <Moment
                    date={props.dates.Updated}
                    format="Do MMM YYYY HH:mm A"
                  />
                </span>
                <span className="refreshedon">
                  Refreshed On:{' '}
                  <Moment
                    date={props.dates.Refreshed}
                    format="DD MMM YYYY HH:mm A"
                  />
                </span>
              </Typography>
            </Grid>
            <Grid item>
              {/* <Chip corner="right"> */}
              <Grid item>
                <div className="status-label__PracticeNameHeader">
                  <span className="status-lable__status-PracticeNameHeader">
                    {props.data.currentStatus}
                  </span>
                </div>
              </Grid>
              {/* </Chip> */}
              {/* Right side corner lable - Active/Inactive */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

PracticeNameHeader.defaultProps = {
  dates: {
    Created: '08 02 2018',
    Updated: '08 02 2018 02:22:22',
    Refreshed: '08 02 2018 02:22:22',
  },
  data: {
    name: 'UCLA Medical Center',
    practiceStatus: 'Onboard 2.2 Reg',
    currentStatus: 'Active',
  },
};

export default withStyles(styles)(PracticeNameHeader);
