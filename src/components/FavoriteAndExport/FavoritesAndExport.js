import React, { Component, Fragment } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import Export from '../../components/DataFormatExport/DataFormatExport';
import ListFavorites from '../../components/ListFavorites/ListFavorites';

class FavoritesAndExport extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left">
              <ListFavorites />
            </Grid.Column>

            <Grid.Column floated="right" width={2}>
              <Icon name="share square outline" size="large" />
              <Export />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default FavoritesAndExport;
