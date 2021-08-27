import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Badge from '@material-ui/core/Badge';

import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root} value={props.value} showLabels>
      <BottomNavigationAction
        label='메뉴'
        value='menu'
        icon={<MenuIcon />}
        component={Link}
        to={'/menu-slct/' + props.table_no}
      />
      <BottomNavigationAction
        label='찜목록'
        value='wishList'
        icon={
          <Badge color='secondary' badgeContent={props.badge_wish}>
            <ShoppingCartIcon />
          </Badge>
        }
        component={Link}
        to={'/wishlist/' + props.table_no}
      />
      <BottomNavigationAction
        label='주문서'
        value='orderSheet'
        icon={
          <Badge color='secondary' badgeContent={props.badge_order}>
            <ListAltIcon />
          </Badge>
        }
        component={Link}
        to={'/ordersheet/' + props.table_no}
      />
    </BottomNavigation>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%',
    height: '4rem',
    left: 0,
    bottom: 0,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    borderTop: '1px solid #a1a1a1',
  },
});

export default NavBar;
