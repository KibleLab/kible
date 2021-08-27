import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import MenuButton from '../components/MenuButton';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GET_MENU_MENU_MGNT_REQUEST } from '../reducers/menuMgnt';
import { GET_MENU_MENU_SLCT_REQUEST, STOCK_DECR_MENU_SLCT_REQUEST } from '../reducers/menuSlct';
import { GET_WISH_WISH_LIST_REQUEST, ADD_WISH_WISH_LIST_REQUEST } from '../reducers/wishList';
import { GET_ORDER_ORDER_SHEET_REQUEST } from '../reducers/orderSheet';

const MenuSelect = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { menu, wish, order, isDone_menu, isDone_wish } = useSelector(
    (state) => ({
      menu: [...state.menuSlct.data],
      wish: [...state.wishList.data[table - 1]],
      order: [...state.orderSheet.data[table - 1]],
      isDone_menu: state.menuSlct.isDone,
      isDone_wish: state.wishList.isDone,
    }),
    shallowEqual,
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_MENU_MENU_MGNT_REQUEST());
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
    dispatch(GET_ORDER_ORDER_SHEET_REQUEST({ table }));
  }, [dispatch, table]);

  const addWish = (menuData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = wish.findIndex((wish) => wish.menu_name === menuData.menu_name);
      if (index === -1) {
        dispatch(ADD_WISH_WISH_LIST_REQUEST({ table, menuData }));
        dispatch(STOCK_DECR_MENU_SLCT_REQUEST({ menuData }));
      } else {
        setMessage('이미 추가된 메뉴입니다.');
        setOpen(true);
      }
    }
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const menuButtonList = () => {
    if (isDone_menu === true && isDone_wish === true)
      return menu.map((data, index) => (
        <MenuButton
          onClick={() => addWish(data)}
          key={index}
          name={data.menu_name}
          stock={data.menu_stock}
          price={data.menu_price}
        />
      ));
  };

  return (
    <div>
      <Helmet>
        <title>메뉴 선택 - Kible Mobile System</title>
      </Helmet>
      <AppBar name={'Menu'} />
      <Container className={classes.body} maxWidth={false}>
        {menuButtonList()}
      </Container>
      <NavBar value={'menu'} table_no={table} badge_wish={wish.length} badge_order={order.length} />
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
            aria-label='close'
            style={{ color: 'yellow' }}
            className={classes.close}
            onClick={() => setOpen(false)}>
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
