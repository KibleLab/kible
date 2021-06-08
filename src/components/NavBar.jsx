import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';

import {useState} from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.value);
  const handleChange = (e) => {
    setValue(e);
  };

  return (
    <BottomNavigation className={classes.root} value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction
        label="메뉴"
        value="menu"
        icon={<MenuIcon />}
        component={Link}
        to={'/MenuSelect/' + props.table_no}
      />
      <BottomNavigationAction
        label="찜목록"
        value="wishList"
        icon={<ShoppingCartIcon />}
        component={Link}
        to={'/WishList/' + props.table_no}
      />
      <BottomNavigationAction
        label="주문서"
        value="orderSheet"
        icon={<ListAltIcon />}
        component={Link}
        to={'/OrderSheet/' + props.table_no}
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
