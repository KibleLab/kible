import AppBar from '../components/AppBar';
import BodyFrame from '../components/BodyFrame';
import NavBar from '../components/NavBar';

const OrderSheet = ({match}) => {
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'주문서 - Table' + table_no} />
      <BodyFrame></BodyFrame>
      <NavBar value={'orderSheet'} table_no={table_no} />
    </div>
  );
};

export default OrderSheet;
