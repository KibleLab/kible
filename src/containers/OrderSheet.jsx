import {makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {useEffect} from 'react';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import OrderMenu from '../components/OrderMenu';

import {useSelector, useDispatch} from 'react-redux';
import {getOS} from '../reducers/orderSheet';

const OrderSheet = ({match}) => {
  const classes = useStyles();
  const {table_no} = match.params;
  const wish = useSelector((state) => [...state.menuSelect.wish]);
  const order = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOS(table_no));
  }, [dispatch, table_no]);

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
      <AppBar name={'주문서 - Table' + table_no} />
      <Container className={classes.body} maxWidth={false}>
        {orderList}
      </Container>
      <Container className={classes.payInfo} maxWidth={false}>
        <Typography className={classes.payText}>결제 금액</Typography>
        <Typography className={classes.calc}>{Number(totalPrice()).toLocaleString()}원</Typography>
      </Container>
      <NavBar value={'orderSheet'} table_no={table_no} badge={wish.length} />
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
