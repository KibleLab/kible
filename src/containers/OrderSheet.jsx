import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import OrderMenu from '../components/OrderMenu';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GET_MENU_MENU_MGNT_REQUEST } from '../reducers/menuMgnt';
import { GET_MENU_MENU_SLCT_REQUEST } from '../reducers/menuSlct';
import { GET_WISH_WISH_LIST_REQUEST } from '../reducers/wishList';
import { GET_ORDER_ORDER_SHEET_REQUEST } from '../reducers/orderSheet';

const OrderSheet = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { wish, order, isDone_order } = useSelector(
    (state) => ({
      wish: [...state.wishList.data[table - 1]],
      order: [...state.orderSheet.data[table - 1]],
      isDone_order: state.orderSheet.isDone,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_MENU_MENU_MGNT_REQUEST());
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
    dispatch(GET_ORDER_ORDER_SHEET_REQUEST({ table }));
  }, [dispatch, table]);

  const totalPrice = () => {
    let total = 0;
    order.forEach((element) => {
      total += element.menu_price * element.order_quantity;
    });
    return total;
  };

  const orderList = () => {
    if (isDone_order === true)
      return order.map((data, index) => (
        <OrderMenu
          key={index}
          name={data.menu_name}
          quantity={data.order_quantity}
          price={data.menu_price}
        />
      ));
  };

  return (
    <div>
      <Helmet>
        <title>Table{table} 주문서 - Kible Mobile System</title>
      </Helmet>
      <AppBar name={'Table' + table + ' 주문서'} />
      <Container className={classes.body} maxWidth={false}>
        {orderList()}
      </Container>
      <Container className={classes.payInfo} maxWidth={false}>
        <Typography className={classes.payText}>결제 금액</Typography>
        <Typography className={classes.calc}>{Number(totalPrice()).toLocaleString()}원</Typography>
      </Container>
      <NavBar value={'orderSheet'} table_no={table} badge_wish={wish.length} />
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
