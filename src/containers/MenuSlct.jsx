import {makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useEffect, useState} from 'react';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import MenuButton from '../components/MenuButton';

import {useDispatch, useSelector} from 'react-redux';
import {getMenu, stockDecr} from '../reducers/menuSlct';
import {addWish, getWish} from '../reducers/wishList';
import {getMenuMgnt} from '../reducers/menuMgnt';
import {getOrder} from '../reducers/orderSheet';

const MenuSelect = ({match}) => {
  const classes = useStyles();
  const {table} = match.params;
  const menu = useSelector((state) => [...state.menuSlct.menu]);
  const wish = useSelector((state) => [...state.wishList.wish[table - 1]]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuMgnt());
    dispatch(getMenu());
    dispatch(getWish(table));
    dispatch(getOrder(table));
  }, [dispatch, table]);

  const _addWish = (menuData) => {
    if (wish.length <= 0) {
      dispatch(addWish({table, menuData}));
      dispatch(stockDecr({menuData}));
    } else if (wish.length > 0) {
      const index = wish.findIndex((wish) => wish.menu_name === menuData.menu_name);
      if (index === -1) {
        dispatch(addWish({table, menuData}));
        dispatch(stockDecr({menuData}));
      } else {
        setMessage('이미 추가된 메뉴입니다.');
        setOpen(true);
      }
    }
  };

  const menuButtonList = menu.map((data) => (
    <MenuButton onClick={() => _addWish(data)} name={data.menu_name} price={data.menu_price} />
  ));
  return (
    <div>
      <AppBar name={'Menu'} />
      <Container className={classes.body} maxWidth={false}>
        {menuButtonList}
      </Container>
      <NavBar value={'menu'} table_no={table} badge={wish.length} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        message={message}
        action={
          <IconButton
            aria-label="close"
            style={{color: 'yellow'}}
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};

const useStyles = makeStyles({
  body: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    height: 'auto',
    left: 0,
    top: '4rem',
    bottom: '4rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingBottom: '0.5rem',
    overflowY: 'auto',
  },
});

export default MenuSelect;
