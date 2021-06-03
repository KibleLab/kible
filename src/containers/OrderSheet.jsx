import AppBar from '../components/AppBar';
import BodyFrame from '../components/BodyFrame';
import NavBar from '../components/NavBar';

const OrderSheet = ({match}) => {
  const table_no = match.params;
  return (
    <div>
      <AppBar name={'주문서 - ' + table_no} />
      <BodyFrame></BodyFrame>
      <NavBar value={'orderSheet'} />
    </div>
  );
};

export default OrderSheet;
