import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RootDispatch, RootState } from '..';
import { ContainerProps } from '../types/containers';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GET_MENU_MENU_MGNT_REQUEST } from '../reducers/menuMgnt';
import { GET_MENU_MENU_SLCT_REQUEST } from '../reducers/menuSlct';
import { GET_WISH_WISH_LIST_REQUEST } from '../reducers/wishList';
import { GET_ORDER_ORDER_SHEET_REQUEST } from '../reducers/orderSheet';

const OrderSheet: FC<ContainerProps> = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { wish, order } = useSelector(
    (state: RootState) => ({
      wish: [...state.wishList.data[Number(table)]],
      order: [...state.orderSheet.data[Number(table)]],
    }),
    shallowEqual,
  );
  const dispatch = useDispatch<RootDispatch>();

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

  const formatNumber = (number: number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const currencyFormatter = (params: { value: number }) => {
    return formatNumber(params.value);
  };

  return (
    <div>
      <Helmet>
        <title>Table{table} 주문서 - Kible Mobile System</title>
      </Helmet>
      <AppBar name={'Table' + table + ' 주문서'} />
      <Container className={classes.body} maxWidth={false}>
        <div className='ag-theme-alpine' style={{ width: '100%', height: '100%' }}>
          <AgGridReact rowData={order} suppressMovableColumns={true}>
            <AgGridColumn field={'menu_name'} headerName={'상품명'} flex={2} />
            <AgGridColumn
              field={'order_quantity'}
              headerName={'수량'}
              valueFormatter={currencyFormatter}
              type='numericColumn'
              flex={1.5}
            />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              valueFormatter={currencyFormatter}
              type='numericColumn'
              flex={1.5}
            />
          </AgGridReact>
        </div>
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
    padding: '0.2rem',
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
