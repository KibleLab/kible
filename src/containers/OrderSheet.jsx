import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

const OrderSheet = ({match}) => {
  const table_no = match.params;
  return (
    <div>
      <AppBar name={'주문서 - ' + table_no} />
      <NavBar />
    </div>
  );
};

export default OrderSheet;
