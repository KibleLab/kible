import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import WishButton from '../components/WishButton';

import {useDispatch, useSelector} from 'react-redux';
import {getMenu, stockDecr, stockIncr, stockRest} from '../reducers/menuSlct';
import {delWish, getWish, quanDecr, quanIncr, resetWish} from '../reducers/wishList';
import {changeMenu, getMenuMgnt} from '../reducers/menuMgnt';
import {addOrder, getOrder, quanIncrOrder} from '../reducers/orderSheet';

const WishList = ({match, history}) => {
  const classes = useStyles();
  const {table} = match.params;
  const menu = useSelector((state) => [...state.menuSlct.menu]);
  const wish = useSelector((state) => [...state.wishList.wish[table - 1]]);
  const order = useSelector((state) => [...state.orderSheet.order[table - 1]]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuMgnt());
    dispatch(getMenu());
    dispatch(getWish(table));
    dispatch(getOrder(table));
  }, [dispatch, table]);

  const _addOrder = () => {
    if (Array.isArray(wish) && wish.length === 0) {
      setMessage('주문할 상품이 없습니다.');
      setOpen(true);
    } else {
      for (let i = 0; i < menu.length; i++) {
        setTimeout(() => {
          dispatch(changeMenu({menuData: menu[i]}));
        }, 500);
      }
      if (order.length === 0) {
        for (let i = 0; i < wish.length; i++) {
          setTimeout(() => {
            dispatch(addOrder({table, wishData: wish[i]}));
          }, 500);
        }
      } else if (order.length > 0) {
        for (let i = 0; i < wish.length; i++) {
          const index = order.findIndex((order) => order.menu_name === wish[i].menu_name);
          if (index === -1) {
            setTimeout(() => {
              dispatch(addOrder({table, wishData: wish[i]}));
            }, 500);
          } else {
            setTimeout(() => {
              dispatch(quanIncrOrder({table, wishData: wish[i], orderData: order[index]}));
            }, 500);
          }
        }
      }
      dispatch(resetWish(table));
      history.push('/ordersheet/' + table);
    }
  };

  const _delWish = (wishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (menu[index] === undefined) {
      menuData = {menu_name: wishData.menu_name, menu_stock: 0};
    }
    dispatch(stockRest({menuData, wishData}));
    dispatch(delWish({table, wishData}));
    setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
    setOpen(true);
  };

  const plus = (wishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    console.log(menu[index]);
    if (menu[index] === undefined) {
      setMessage('재고가 없습니다.');
      setOpen(true);
    } else {
      dispatch(quanIncr({table, wishData}));
      dispatch(stockDecr({menuData: menu[index]}));
    }
  };

  const minus = (wishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (wishData.wish_quantity < 2) {
      dispatch(stockIncr({menuData}));
      dispatch(delWish({table, wishData}));
      setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    } else {
      if (menu[index] === undefined) {
        menuData = {menu_name: wishData.menu_name, menu_stock: 0};
      }
      dispatch(quanDecr({table, wishData}));
      dispatch(stockIncr({menuData}));
    }
  };

  const wishButtonList = wish.map((data, index) => (
    <WishButton
      index={data.menu_no}
      name={data.menu_name}
      price={data.menu_price}
      quantity={data.wish_quantity}
      delete={() => _delWish(data)}
      plus={() => plus(data, index)}
      minus={() => minus(data, index)}
    />
  ));

  return (
    <div>
      <AppBar name={'찜목록'} />
      <Container className={classes.body} maxWidth={false}>
        {wishButtonList}
      </Container>

      {(() => {
        if (wish.length > 0) {
          return (
            <Container className={classes.buttonC} maxWidth={false}>
              <Button
                className={classes.button}
                onClick={() => _addOrder()}
                Component={Link}
                to={'/ordersheet/' + table}
              >
                주문서에 추가
              </Button>
            </Container>
          );
        }
      })()}

      <NavBar value={'wishList'} table_no={table} />
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
    '&:hover': {backgroundColor: '#FF006B'},
  },
});

export default WishList;
