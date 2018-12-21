import React from 'react';
import axios from 'axios';
import APIHelper from '@/helper/apihelper';
import { VALIDATE_REGISTRY_TOKEN } from '../../graphql/query';
import { setJwt } from '@/utils/jwtUtils';
import { Typography } from '@material-ui/core';
import TemporaryPage from '@/components/TemporaryPage/TemporaryPage';
import Loader from '../../helper/loaders/ComponentLoader';

const apiHelperInstance = new APIHelper();

class SSORouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestValidating: null,
      IstokenInValid: true,
      inputToken: props.location.search.substr(
        14,
        props.location.search.length,
      ),
    };
  }
  componentDidMount() {
    const inputToken = this.state.inputToken;
    if (inputToken != undefined) {
      this.setState({ requestValidating: true });
      axios
        .post(
          apiHelperInstance.Resources.ValidateRegistryDashboardToken
          , {
          query: VALIDATE_REGISTRY_TOKEN,
          variables: { Token: '' },
        })
        .then(res => {
          if (res.data.data.validateRegistryDeshboardToken.statusCode === 1) {
            setJwt(
              res.data.data.validateRegistryDeshboardToken.data.token,
              res.data.data.validateRegistryDeshboardToken.data.duration,
            );
            this.props.history.push('/layout');
          } else {
            debugger;
            this.setState({ IstokenInValid: false, requestValidating: false });
          }
        })
        .catch(ex => {
          console.log(ex);
          debugger;
          this.setState({ IstokenInValid: false, requestValidating: false });
        });
    }
  }

  render() {
    const { requestValidating, IstokenInValid, inputToken } = this.state;
    if (inputToken === undefined) {
      return <div>In valid request</div>;
    }
    if (requestValidating) {
      return (
        <React.Fragment>
          {' '}
          <Loader />
          <Typography variant="subtitle1" gutterBottom>
            Validating login request
          </Typography>
        </React.Fragment>
      );
    } else if (!IstokenInValid) {
      return (
        <TemporaryPage
          children={
            <Typography variant="subtitle1" gutterBottom>
              Please contact registry admin.
            </Typography>
          }
        />
      );
    }
    return (
      <React.Fragment>
        <Loader />
        <Typography variant="subtitle1" gutterBottom>
          Initiating token validating process
        </Typography>
      </React.Fragment>
    );
  }
}

export default SSORouter;
