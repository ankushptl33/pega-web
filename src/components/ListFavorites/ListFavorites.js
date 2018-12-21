import React, { Component, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';

class ListFavorites extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid divided columns={3}>
          <Grid.Row>
            <Grid.Column>All</Grid.Column>

            <Grid.Column>Favorites</Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ListFavorites;
