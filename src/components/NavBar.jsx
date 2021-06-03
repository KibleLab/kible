import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '8%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    borderTop: '1px solid #a1a1a1',
    fontSize: 14,
    fontStyle: 'bold',
    fontColor: '#000000',
  },
});
const NavBar = () => {
  const classes = useStyles();
  return (
    <BottomNavigation className={classes.root} showLabels>
      <BottomNavigationAction label="메뉴" href="/MenuSelect/:table_no" />
      <BottomNavigationAction label="찜목록" href="/WishList/:table_no" />
      <BottomNavigationAction label="주문서" href="/OrderSheet/:table_no" />
    </BottomNavigation>
  );
};

export default NavBar;
