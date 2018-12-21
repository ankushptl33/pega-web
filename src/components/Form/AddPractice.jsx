import React, { Component } from 'react';
import {
  Modal,
  Button,
  Header,
  Input,
  Image,
  Label,
  Grid,
  Icon,
  Dropdown,
  Form,
  Checkbox,
} from 'semantic-ui-react';

class AddPractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
      showModal: false,
    };
  }

  handleChangeForms = (e, { value }) => {
    this.setState({ something: value });
  };

  handleCreateButton(evt) {
    evt.preventDefault();
    this.closeModal();
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { something, showModal } = this.state;
    return (
      <Modal
        // ------------- fix -------------
        className="scrolling"
        // -------------------------------

        closeIcon
        onClose={this.closeModal}
        open={showModal}
        trigger={
          <Button onClick={() => this.setState({ showModal: true })}>
            <Icon className="plus" />
            Add Practice
          </Button>
        }>
        <Header>Add Practice</Header>
        Practice Details
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input
                label={this.props.practiceId}
                placeholder="Enter ID"
              />
              <Form.Input
                label={this.props.practiceName}
                placeholder="Enter name"
              />
              <Form.Field control={Input} label={this.props.practicestatus}>
                <Checkbox toggle />
              </Form.Field>
            </Form.Group>

            <Form.Group>
              <Form.Input
                label={this.props.address1}
                placeholder="Regent Plaza"
              />
              <Form.Select
                fluid
                label={this.props.timezone}
                placeholder="GMT-5"
              />
            </Form.Group>
            <Form.Group>
              <Form.Select fluid label={this.props.state} placeholder="maha" />
              <Form.Select fluid label={this.props.city} placeholder="pune" />
              <Form.Select fluid label={this.props.zip} placeholder="98" />
            </Form.Group>
            <Button
              floated="right"
              onClick={evt => this.handleCreateButton(evt)}>
              {this.props.Add}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
// Specifies the default values for props:
AddPractice.defaultProps = {
  practiceId: 'PracticeId',
  practiceName: 'practiceName',
  practicestatus: 'Practice Status',
  address1: 'address1*',
  timezone: 'Practice Time zone',
  state: 'state*',
  city: 'city*',
  zip: 'zip*',
  Add: 'ADD',
};

export default AddPractice;
