import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import WishButton from '../components/WishButton';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GET_MENU_MENU_MGNT_REQUEST, CHANGE_MENU_MENU_MGNT_REQUEST } from '../reducers/menuMgnt';
import {
  GET_MENU_MENU_SLCT_REQUEST,
  STOCK_DECR_MENU_SLCT_REQUEST,
  STOCK_INCR_MENU_SLCT_REQUEST,
  STOCK_REST_MENU_SLCT_REQUEST,
} from '../reducers/menuSlct';
import {
  GET_WISH_WISH_LIST_REQUEST,
  DELETE_WISH_WISH_LIST_REQUEST,
  RESET_WISH_WISH_LIST_REQUEST,
  QUAN_INCR_WISH_LIST_REQUEST,
  QUAN_DECR_WISH_LIST_REQUEST,
} from '../reducers/wishList';
import {
  GET_ORDER_ORDER_SHEET_REQUEST,
  ADD_ORDER_ORDER_SHEET_REQUEST,
  QUAN_INCR_ORDER_SHEET_REQUEST,
} from '../reducers/orderSheet';

const WishList = ({ match, history }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { menu, wish, order, isDone_menu, isDone_wish, isDone_order } = useSelector(
    (state) => ({
      menu: [...state.menuSlct.data],
      wish: [...state.wishList.data[table - 1]],
      order: [...state.orderSheet.data[table - 1]],
      isDone_menu: state.menuSlct.isDone,
      isDone_wish: state.wishList.isDone,
      isDone_order: state.orderSheet.isDone,
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

  const addOrder = () => {
    if (isDone_menu === true && isDone_wish === true && isDone_order === true) {
      if (wish.length > 0) {
        if (order.length > 0) {
          for (let i = 0; i < wish.length; i++) {
            const index = order.findIndex((order) => order.menu_name === wish[i].menu_name);
            let wishData = wish[i];
            let orderData = order[index];
            index === -1
              ? dispatch(ADD_ORDER_ORDER_SHEET_REQUEST({ table, wishData }))
              : dispatch(QUAN_INCR_ORDER_SHEET_REQUEST({ table, wishData, orderData }));
          }
        } else {
          for (let i = 0; i < wish.length; i++) {
            dispatch(ADD_ORDER_ORDER_SHEET_REQUEST({ table, wishData: wish[i] }));
          }
        }
        for (let i = 0; i < menu.length; i++) {
          dispatch(CHANGE_MENU_MENU_MGNT_REQUEST({ menuData: menu[i] }));
        }
        dispatch(RESET_WISH_WISH_LIST_REQUEST({ table }));
        history.push('/ordersheet/' + table);
      } else {
        setMessage('주문할 상품이 없습니다.');
        setOpen(true);
      }
    }
  };

  const delWish = (wishData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
      let menuData = menu[index];
      if (!menuData) menuData = { menu_name: wishData.menu_name, menu_stock: 0 };
      dispatch(STOCK_REST_MENU_SLCT_REQUEST({ menuData, wishData }));
      dispatch(DELETE_WISH_WISH_LIST_REQUEST({ table, wishData }));
      setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    }
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const plus = (wishData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
      let menuData = menu[index];
      if (menuData.menu_stock === 0) {
        setMessage('재고가 없습니다.');
        setOpen(true);
      } else {
        dispatch(QUAN_INCR_WISH_LIST_REQUEST({ table, wishData }));
        dispatch(STOCK_DECR_MENU_SLCT_REQUEST({ menuData }));
      }
    }
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const minus = (wishData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
      let menuData = menu[index];
      if (wishData.wish_quantity > 1) {
        if (!menuData) menuData = { menu_name: wishData.menu_name, menu_stock: 0 };
        dispatch(QUAN_DECR_WISH_LIST_REQUEST({ table, wishData }));
        dispatch(STOCK_INCR_MENU_SLCT_REQUEST({ menuData }));
      } else {
        dispatch(STOCK_REST_MENU_SLCT_REQUEST({ menuData, wishData }));
        dispatch(DELETE_WISH_WISH_LIST_REQUEST({ table, wishData }));
        setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
        setOpen(true);
      }
    }
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const wishButtonList = () => {
    if (isDone_menu === true && isDone_wish === true)
      return wish.map((data, index) => (
        <WishButton
          key={index}
          index={index}
          name={data.menu_name}
          price={data.menu_price}
          quantity={data.wish_quantity}
          delete={() => delWish(data)}
          plus={() => plus(data, index)}
          minus={() => minus(data, index)}
        />
      ));
  };

  const showAddToOrderButton = () => {
    if (wish.length > 0) {
      return (
        <Container className={classes.buttonC} maxWidth={false}>
          <Button
            className={classes.button}
            onClick={() => addOrder()}
            Component={Link}
            to={'/ordersheet/' + table}>
            주문서에 추가
          </Button>
        </Container>
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>Table{table} 찜목록 - Kible Mobile System</title>
      </Helmet>
      <AppBar name={'Table' + table + ' 찜목록'} />
      <Container className={classes.body} maxWidth={false}>
        {wishButtonList()}
      </Container>
      {showAddToOrderButton()}
      <NavBar value={'wishList'} table_no={table} badge_order={order.length} />
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
    bottom: '8rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingBottom: '0.5rem',
    overflowY: 'auto',
  },
  buttonC: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    height: 'auto',
    left: 0,
    bottom: '4rem',
    padding: '0.5rem',
    borderTop: '1px solid #a1a1a1',
  },
  button: {
    background: '#FF006B',
    width: '100%',
    height: '100%',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: '10px',
    '&:hover': { backgroundColor: '#FF006B' },
  },
});

export default WishList;
