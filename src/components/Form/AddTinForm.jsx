import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Typography,
  Modal,
  Button,
  Paper,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  modalWrapper: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50% , -50%)',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modalCloseIcon: {
    width: '45px',
    height: '45px',
    float: 'right',
    cursor: 'pointer',
    borderRadius: '50%',
    minWidth: 'inherit',
    fontSize: '1.5rem',
    textAlign: 'center',
    overflow: 'visible',
    flex: '0 0 auto',
  },
  modalTitle: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  practiceFormRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
  },
  practiceFormCol: {
    flex: 1,
    margin: '0 0 15px 0',
  },
  modalBtnWrapper: {
    display: 'inherit',
  },
  modalRightBtn: {
    float: 'right',
    with: 'inherit',
  },
  inlinePracticeFormCol: {
    margin: '0 15px 15px 0',
    '&:last-Child': {
      marginRight: 0,
    },
  },
});
class AddTinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, config } = this.props;
    // const {classes} = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen} className={classes.button}>
          <FontAwesomeIcon
            icon={['fal', 'plus']}
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          {this.props.outerbuttonText}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}>
          <Paper className={classNames(classes.paper, classes.modalWrapper)}>
            <Typography variant={config.variant_title} id="modal-title">
              <span className={classes.modalTitle}>{this.props.heading}</span>
              <Button
                className={classes.modalCloseIcon}
                onClick={this.handleClose}>
                <FontAwesomeIcon icon={['fal', 'times']} />
              </Button>
            </Typography>
            <form variant={config.variant_middle}>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl className={classes.practiceFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {this.props.tinNumber}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.tinNumber}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </FormGroup>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl
                  className={classNames(
                    classes.practiceFormCol,
                    classes.inlinePracticeFormCol,
                  )}>
                  <TextField
                    label={this.props.fromDate}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <FormControl
                  className={classNames(
                    classes.practiceFormCol,
                    classes.inlinePracticeFormCol,
                  )}>
                  <TextField
                    label={this.props.toDate}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </FormGroup>
              <FormGroup row={true} className={classes.modalBtnWrapper}>
                <Button
                  className={classes.modalRightBtn}
                  onClick={e => this.props.addButton(e, this.props)}>
                  {this.props.innerbuttonText}
                </Button>
              </FormGroup>
            </form>
          </Paper>
        </Modal>
      </div>
    );
  }
}

// Specifies the default values for props:
AddTinForm.defaultProps = {
  config: {
    variant_title: 'h6',
    variant_middle: 'subtitle1',
  },

  heading: 'ADD TIN',
  tinNumber: 'Tin Number *',
  fromDate: 'Valid From *',
  toDate: 'Valid To *',
  innerbuttonText: 'ADD',
  outerbuttonText: 'Add New TIN',
  addButton: (e, data) => {
    // console.log((e, data);
  },
};

AddTinForm.propTypes = {
  heading: PropTypes.string,
  tinNumber: PropTypes.string,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  innerbuttonText: PropTypes.string,
  outerbuttonText: PropTypes.string,
  addButton: PropTypes.func,
};

export default withStyles(styles)(AddTinForm);
