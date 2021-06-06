import AppBar from '../components/AppBar';
import Frame from '../components/Frame';
import NavBar from '../components/NavBar';

const WishList = ({match}) => {
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'찜목록'} />
      <Frame top={'4rem'} bottom={'8rem'}></Frame>
      <NavBar value={'wishList'} table_no={table_no} />
    </div>
  );
};

export default WishList;
