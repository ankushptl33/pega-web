import React, { Component } from 'react';
import classNames from 'classnames';
//import { Modal, Button, Header, Input, Label, Icon, Form } from "semantic-ui-react";
import PropTypes from 'prop-types';
import {
  Typography,
  Modal,
  Button,
  Paper,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  TextField,
  Switch,
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
class PracticeContactForm extends Component {
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
    const { classes } = this.props;
    const { labels, data, func } = this.props.practiceContactFormProps;
    return (
      <div>
        <Button className={classes.button} onClick={this.handleOpen}>
          <FontAwesomeIcon
            icon={['fal', 'plus']}
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          {labels.outerbuttonText}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}>
          <Paper className={classNames(classes.paper, classes.modalWrapper)}>
            <Typography variant="h6" id="modal-title">
              <span className={classes.modalTitle}>{labels.heading}</span>
              <Button
                className={classes.modalCloseIcon}
                onClick={this.handleClose}>
                <FontAwesomeIcon icon={['fal', 'times']} />
              </Button>
            </Typography>
            <form>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.clinicianStatus}
                        value={data.clinicianStatus}
                        color="primary"
                      />
                    }
                    label={labels.clinicianStatus}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.practiceAdminStatus}
                        value={data.practiceAdminStatus}
                        color="primary"
                      />
                    }
                    label={labels.practiceAdminStatus}
                  />
                </FormControl>
              </FormGroup>
              <Typography variant="subtitle1">{labels.subHeading1}</Typography>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl className={classes.PracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.memberID}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.memberID}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </FormGroup>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.fname}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.fname}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.mname}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.mname}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.lname}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.lname}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <TextField
                    label={labels.dateOfBirth}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </FormGroup>
              <Typography variant="subtitle1">{labels.subHeading2}</Typography>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.eaddress}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.eaddress}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.aladdress}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.aladdress}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.phone}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <TextField
                    //id="standard-select-currency-native"
                    select
                    label={labels.contactType}
                    //className={classes.textField}
                    //value={this.state.currency}
                    //onChange={this.handleChange('currency')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        // className: classes.menu,
                      },
                    }}
                    margin="normal">
                    {labels.contactTypes.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
              </FormGroup>
              <FormGroup row={true} className={classes.practiceFormRow}>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.loginStatus}
                        value={data.loginStatus}
                        color="primary"
                      />
                    }
                    label={labels.loginStatus}
                  />
                </FormControl>
                <FormControl className={classes.inlinePracticeFormCol}>
                  <InputLabel htmlFor="component-simple">
                    {labels.createdUserName}
                  </InputLabel>
                  <Input
                    id="component-simple"
                    value={this.state.createdUserName}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </FormGroup>
              <FormGroup row={true} className={classes.modalBtnWrapper}>
                <Button
                  className={classes.modalRightBtn}
                  onClick={func.addButton}>
                  {labels.innerbuttonText}
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
PracticeContactForm.defaultProps = {
  practiceContactFormProps: {
    labels: {
      heading: 'Add Admin',
      subHeading1: 'Personal Details',
      subHeading2: 'Contact Details',
      clinicianStatus: 'Are you a Clinician ?',
      practiceAdminStatus: 'Practice Admin Status',
      loginStatus: 'Create Login',
      memberID: 'Member ID',
      npi: 'NPI *',
      valideate_npi: 'Validate NPI',
      fname: 'First Name *',
      mname: 'Middle Name',
      lname: 'Last Name *',
      dateOfBirth: 'Date Of Birth',
      uname: 'username *',
      eaddress: 'Email Address',
      aladdress: 'Alternate Email Address',
      phone: 'Phone Number',
      contactType: 'Contact Type',
      createdUserName: 'Created Username',
      contactTypes: [
        {
          value: 'Contact Type 1',
          label: 'Contact Type 1',
        },
        {
          value: 'Contact Type 2',
          label: 'Contact Type 2',
        },
        {
          value: 'Contact Type 3',
          label: 'Contact Type 3',
        },
        {
          value: 'Contact Type 4',
          label: 'Contact Type 4',
        },
      ],
      innerbuttonText: 'ADD',
      outerbuttonText: 'Add New Admin',
    },
    data: {
      clinicianstatus: 'Yes',
      practiceAdminStatus: 'No',
      loginStatus: 'No',
    },
    func: {
      addButton: () => {
        // console.log(('Add button clicked successfully in practice contact form');
      },
    },
  },
};

export default withStyles(styles)(PracticeContactForm);
