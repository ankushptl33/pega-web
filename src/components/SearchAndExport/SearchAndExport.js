import React, { Component, Fragment } from 'react';
import Search from '../../components/Search/BackSearchComponent';
import Export from '../../components/DataFormatExport/DataFormatExport';
import { Grid, Icon } from 'semantic-ui-react';

class SearchAndExport extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid container>
            <Grid item>
              <Search />
            </Grid>

            <Grid item>
              <Export />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default SearchAndExport;
