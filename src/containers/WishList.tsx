import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RootDispatch, RootState } from '..';
import { ContainerProps, WishData } from '../types/containers';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import WishButton from '../components/WishButton';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { menuMgntActions } from '../reducers/menuMgnt';
import { menuSlctActions } from '../reducers/menuSlct';
import { wishListActions } from '../reducers/wishList';
import { orderSheetActions } from '../reducers/orderSheet';

const WishList: FC<ContainerProps> = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { menu, wish, order, isDone_menu, isDone_wish, isDone_order } = useSelector(
    (state: RootState) => ({
      menu: [...state.menuSlct.data],
      wish: [...state.wishList.data[Number(table)]],
      order: [...state.orderSheet.data[Number(table)]],
      isDone_menu: state.menuSlct.isDone,
      isDone_wish: state.wishList.isDone,
      isDone_order: state.orderSheet.isDone,
    }),
    shallowEqual,
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(menuMgntActions.getMenu_request());
    dispatch(menuSlctActions.getMenu_request());
    dispatch(wishListActions.getWish_request({ table }));
    dispatch(orderSheetActions.getOrder_request({ table }));
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
              ? dispatch(orderSheetActions.addOrder_request({ table, wishData }))
              : dispatch(orderSheetActions.quanIncr_request({ table, wishData, orderData }));
          }
        } else {
          for (let i = 0; i < wish.length; i++) {
            dispatch(orderSheetActions.addOrder_request({ table, wishData: wish[i] }));
          }
        }
        for (let i = 0; i < menu.length; i++) {
          dispatch(menuMgntActions.changeMenu_request({ menuData: menu[i] }));
        }
        dispatch(wishListActions.resetWish_request({ table }));
      } else {
        setMessage('주문할 상품이 없습니다.');
        setOpen(true);
      }
    }
  };

  const delWish = (wishData: WishData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
      let menuData = menu[index];
      if (menuData.menu_stock === 0) menuData = { menu_name: wishData.menu_name, menu_stock: 0 };
      dispatch(menuSlctActions.stockRest_request({ menuData, wishData }));
      dispatch(wishListActions.deleteWish_request({ table, wishData }));
      setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    }
    dispatch(menuSlctActions.getMenu_request());
    dispatch(wishListActions.getWish_request({ table }));
  };

  const plus = (wishData: WishData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
      let menuData = menu[index];
      if (menuData.menu_stock === 0) {
        setMessage('재고가 없습니다.');
        setOpen(true);
      } else {
        dispatch(wishListActions.quanIncr_request({ table, wishData }));
        dispatch(menuSlctActions.stockDecr_request({ menuData }));
      }
    }
    dispatch(menuSlctActions.getMenu_request());
    dispatch(wishListActions.getWish_request({ table }));
  };

  const minus = (wishData: WishData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
      let menuData = menu[index];
      if (wishData.wish_quantity > 1) {
        if (menuData.menu_stock === 0) menuData = { menu_name: wishData.menu_name, menu_stock: 0 };
        dispatch(wishListActions.quanDecr_request({ table, wishData }));
        dispatch(menuSlctActions.stockIncr_request({ menuData }));
      } else {
        dispatch(menuSlctActions.stockRest_request({ menuData, wishData }));
        dispatch(wishListActions.deleteWish_request({ table, wishData }));
        setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
        setOpen(true);
      }
    }
    dispatch(menuSlctActions.getMenu_request());
    dispatch(wishListActions.getWish_request({ table }));
  };

  const wishButtonList = (): any => {
    if (isDone_menu === true && isDone_wish === true)
      return wish.map((data, index) => (
        <WishButton
          key={index}
          name={data.menu_name}
          price={data.menu_price}
          quantity={data.wish_quantity}
          delete={() => delWish(data)}
          plus={() => plus(data)}
          minus={() => minus(data)}
        />
      ));
  };

  const showAddToOrderButton = (): any => {
    if (wish.length > 0) {
      return (
        <Container className={classes.buttonC} maxWidth={false}>
          <Button
            className={classes.button}
            onClick={() => addOrder()}
            component={Link}
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
          <IconButton aria-label='close' style={{ color: 'yellow' }} onClick={() => setOpen(false)}>
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
