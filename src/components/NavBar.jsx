import {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '4rem',
    position: 'fixed',
    left: 0,
    bottom: 0,
    borderTop: '1px solid #a1a1a1',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

const NavBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.value);

  const handleChange = (e) => {
    setValue(e);
  };

  return (
    <BottomNavigation
      className={classes.root}
      value={value}
      onChange={handleChange}
      fixed
      showLabels
    >
      <BottomNavigationAction
        label="메뉴"
        value="menu"
        href="/MenuSelect/:table_no"
        icon={<MenuIcon />}
      />
      <BottomNavigationAction
        label="찜목록"
        value="wishList"
        href="/WishList/:table_no"
        icon={<ShoppingCartIcon />}
      />
      <BottomNavigationAction
        label="주문서"
        value="orderSheet"
        href="/OrderSheet/:table_no"
        icon={<ListAltIcon />}
      />
    </BottomNavigation>
  );
};

export default NavBar;
