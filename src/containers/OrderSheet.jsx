import {makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {useEffect} from 'react';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import OrderMenu from '../components/OrderMenu';

import {useSelector, useDispatch} from 'react-redux';
import {getOrder} from '../reducers/orderSheet';
import {getMenuMgnt} from '../reducers/menuMgnt';
import {getMenu} from '../reducers/menuSlct';
import {getWish} from '../reducers/wishList';

const OrderSheet = ({match}) => {
  const classes = useStyles();
  const {table} = match.params;
  const wish = useSelector((state) => [...state.wishList.wish[table - 1]]);
  const order = useSelector((state) => [...state.orderSheet.order[table - 1]]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuMgnt());
    dispatch(getMenu());
    dispatch(getWish(table));
    dispatch(getOrder(table));
  }, [dispatch, table]);

  const totalPrice = () => {
    let total = 0;
    order.forEach((element) => {
      total += element.menu_price * element.order_quantity;
    });
    return total;
  };

  const orderList = order.map((data) => (
    <OrderMenu name={data.menu_name} quantity={data.order_quantity} price={data.menu_price} />
  ));

  return (
    <div>
      <AppBar name={'주문서 - Table' + table} />
      <Container className={classes.body} maxWidth={false}>
        {orderList}
      </Container>
      <Container className={classes.payInfo} maxWidth={false}>
        <Typography className={classes.payText}>결제 금액</Typography>
        <Typography className={classes.calc}>{Number(totalPrice()).toLocaleString()}원</Typography>
      </Container>
      <NavBar value={'orderSheet'} table_no={table} badge={wish.length} />
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
  payInfo: {
    position: 'fixed',
    background: '#E5D1FF',
    width: '100%',
    height: '4rem',
    left: 0,
    bottom: '4rem',
    display: 'flex',
    alignItems: 'center',
  },
  payText: {
    position: 'absolute',
    left: '1rem',
    textAlign: 'left',
    fontSize: '1rem',
    float: 'left',
    fontWeight: 'bold',
  },
  calc: {
    position: 'absolute',
    right: '1rem',
    textAlign: 'right',
    fontSize: '1rem',
    float: 'right',
    color: 'red',
  },
});

export default OrderSheet;
