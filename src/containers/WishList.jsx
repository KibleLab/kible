import AppBar from '../components/AppBar';
import BodyFrame from '../components/BodyFrame';
import NavBar from '../components/NavBar';

const WishList = ({match}) => {
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'찜목록'} />
      <BodyFrame></BodyFrame>
      <NavBar value={'wishList'} table_no={table_no} />
    </div>
  );
};

export default WishList;
