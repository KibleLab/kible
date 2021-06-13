import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useState} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import WishButton from '../components/WishButton';

import {useDispatch, useSelector} from 'react-redux';
import {
  delWish,
  quanDecr,
  quanIncr,
  resetWish,
  stockDecr,
  stockIncr,
  stockRest,
} from '../reducers/menuSelect';
import {changeMenu} from '../reducers/menuManagement';
import {addOS, quanIncrOS} from '../reducers/orderSheet';

const WishList = ({match, history}) => {
  const classes = useStyles();
  const {table_no} = match.params;
  const menu = useSelector((state) => [...state.menuSelect.menu]);
  const wish = useSelector((state) => [...state.menuSelect.wish]);
  const order = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const plus = (data, index) => {
    const menuIdx = menu.findIndex((menu) => menu.menu_no === data.menu_no);
    if (menu[menuIdx].menu_stock < 1) {
      setMessage('재고가 없습니다.');
      setOpen(true);
    } else {
      dispatch(quanIncr(index));
      dispatch(stockDecr(data));
    }
  };

  const minus = (data, index) => {
    if (data.order_quantity < 2) {
      dispatch(stockIncr(data));
      dispatch(delWish(data));
      setMessage(data.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    } else {
      dispatch(quanDecr(index));
      dispatch(stockIncr(data));
    }
  };

  const sendOrderSheet = () => {
    if (Array.isArray(wish) && wish.length === 0) {
      setMessage('주문할 상품이 없습니다.');
      setOpen(true);
    } else {
      for (let i = 0; i < menu.length; i++) {
        setTimeout(() => {
          const data = {menu_no: menu[i].menu_no, menu_stock: menu[i].menu_stock};
          dispatch(changeMenu(data));
        }, 500);
      }
      if (order.length === 0) {
        for (let i = 0; i < wish.length; i++) {
          setTimeout(() => {
            dispatch(addOS({table_no: table_no, data: wish[i]}));
          }, 500);
        }
      } else if (order.length > 0) {
        for (let i = 0; i < wish.length; i++) {
          const index = order.findIndex((order) => order.menu_no === wish[i].menu_no);
          if (index === -1) {
            setTimeout(() => {
              dispatch(addOS({table_no: table_no, data: wish[i]}));
            }, 500);
          } else {
            setTimeout(() => {
              const data = {
                menu_no: wish[i].menu_no,
                order_quantity: order[index].order_quantity + wish[i].order_quantity,
              };
              dispatch(quanIncrOS({table_no: table_no, data: data}));
            }, 500);
          }
        }
      }
      dispatch(resetWish());
      history.push('/OrderSheet/' + table_no);
    }
  };

  const rmWish = (data) => {
    dispatch(stockRest(data));
    dispatch(delWish(data));
    setMessage(data.menu_name + '이/가 찜목록에서 삭제됨.');
    setOpen(true);
  };

  const wishButtonList = wish.map((data, index) => (
    <WishButton
      index={data.menu_no}
      name={data.menu_name}
      price={data.menu_price}
      quantity={data.order_quantity}
      delete={() => rmWish(data)}
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
                onClick={() => sendOrderSheet()}
                Component={Link}
                to={'/OrderSheet/' + table_no}
              >
                주문서에 추가
              </Button>
            </Container>
          );
        }
      })()}

      <NavBar value={'wishList'} table_no={table_no} />
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
