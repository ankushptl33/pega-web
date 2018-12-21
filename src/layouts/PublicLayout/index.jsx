import LoginBranding from '@/components/LoginBranding';
import Footer from '@/components/Footer';
import { Grid, Hidden } from '@material-ui/core';
export const publicLayout = props => (
  <Grid container className="login--signin  login--page">
    <Grid container className="login--signin__row">
      
        
          <Grid item  xs={12} md>
            <LoginBranding />
          </Grid>
          <Hidden only={['sm', 'xs']}>
          <Grid item className="login--page--ver__divider"></Grid>
          </Hidden>
          <Grid item item xs={12} md >
            <Grid container justify="center" alignItems="center"  className="login__wrapper-2" id="home">
              {props.children}
            </Grid>
          
          </Grid>
          
      </Grid>{' '}
      <Grid container className= "footer-copyright">
          <Grid item xs={12}>
            <Footer />
          </Grid>
          </Grid>
    </Grid>
 
);
