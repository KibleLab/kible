import AppBar from '../components/AppBar';
import Frame from '../components/Frame';
import NavBar from '../components/NavBar';
import {makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  payText: {
    width: '40%',
    height: '100%',
    textAlign: 'left',
    fontSize: '1rem',
    float: 'left',
    fontWeight: 'bold',
  },
  calc: {
    width: '60%',
    height: '100%',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
    color: 'red',
  },
});

const OrderSheet = ({match}) => {
  const classes = useStyles();
  const table_no = match.params.table_no;

  const totalPrice = () => {};

  return (
    <div>
      <AppBar name={'주문서 - Table' + table_no} />
      <Frame
        backColor={'white'}
        height={'auto'}
        top={'4rem'}
        bottom={'8rem'}
        padding={'0.5rem'}
      ></Frame>
      <Frame backColor={'#E5D1FF'} height={'4rem'} bottom={'4rem'} padding={'1.2rem'}>
        <Typography className={classes.payText}>결제 금액</Typography>
        <Typography className={classes.calc}>{Number(totalPrice()).toLocaleString()}원</Typography>
      </Frame>
      <NavBar value={'orderSheet'} table_no={table_no} />
    </div>
  );
};

export default OrderSheet;
