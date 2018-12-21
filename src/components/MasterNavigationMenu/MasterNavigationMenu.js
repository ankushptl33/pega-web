import React from 'react';
import { Link } from 'react-router-dom';
import { LandingPageCss } from './MasterNavigation.less';
import { List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import menu from '@/routes/menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
  selected: {
    backgroundColor: 'rgba(204, 224, 248, 1)',
    color: 'rgba(65, 148, 242, 1)',
  },
});
 /* THIS IS SIDE MENU COMPONENT:
  ================================================================ */
 const MasterNavigationMenu = props => {
   const { activeIcon, classes } = props;

  return (
    <div className="main-navigation__container">
      <List className="main-navigation__ul">
        {props.menu.length
          ? props.menu.map((menuObj, index) => (
              <ListItem 
              className={props.selectedMenuIndex === index ? props.activeIcon : " "}
                button
                selected={props.selectedMenuIndex === index}
                classes={{ selected: classes.selected }}
                key={menuObj.resource}
                onClick={event => {
                  props.onListItemClick('',index, menuObj.router);
                }}>
                <ListItemIcon className="main-nav--icon__wrapper"  >
                  <FontAwesomeIcon icon={['fal',menuObj.class]}/>
                </ListItemIcon>
                <ListItemText primary={menuObj.resource} 
                />
              </ListItem>
            ))
          : null}
      </List>
    </div>
  );
};

export default withStyles(styles)(MasterNavigationMenu);
