import AppBar from '../components/AppBar';
import Frame from '../components/Frame';
import NavBar from '../components/NavBar';

const OrderSheet = ({match}) => {
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'주문서 - Table' + table_no} />
      <Frame backColor={'white'} height={'auto'} top={'4rem'} bottom={'8rem'}></Frame>
      <Frame backColor={'#E5D1FF'} height={'4rem'} bottom={'4rem'}></Frame>
      <NavBar value={'orderSheet'} table_no={table_no} />
    </div>
  );
};

export default OrderSheet;
