import React from 'react';
import classNames from 'classnames';
import { Button, Grid, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from './config';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const DataFormatExport = props => {
  const { classes } = props;
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };

        return (
          <React.Fragment>
            <Button
              size="small"
              className={classes.button}
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}>
              Export{' '}
              <FontAwesomeIcon
                icon={config.angelIcon}
                className={classNames(classes.rightIcon, classes.iconSmall)}
              />
            </Button>
            <Menu
              id="render-props-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}>
              {Object.keys(props.type).map((value, key) => {
                return (
                  <MenuItem
                    key={key}
                    text={props.type[value]}
                    name={props.type[value]}
                    value={props.type[value]}
                    onClick={props.clickHandlers[value]}>
                    <Grid onClick={handleClose}>{props.type[value]}</Grid>
                  </MenuItem>
                );
              })}
            </Menu>
          </React.Fragment>
        );
      }}
    </WithState>
  );
};

DataFormatExport.defaultProps = {
  type: {
    pdf: 'PDF',
    exl: 'EXL',
    csv: 'CSV',
  },
  clickHandlers: {
    pdf: e => {
      // console.log(('You Clicked ', e.target.textContent);
    },
    exl: e => {
      // console.log(('You Clicked', e.target.textContent);
    },
    csv: e => {
      // console.log(('You Clicked', e.target.textContent);
    },
  },
};
export default withStyles(styles)(DataFormatExport);
