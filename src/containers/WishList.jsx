import AppBar from '../components/AppBar';
import BodyFrame from '../components/BodyFrame';
import NavBar from '../components/NavBar';

const WishList = () => {
  return (
    <div>
      <AppBar name={'찜목록'} />
      <BodyFrame></BodyFrame>
      <NavBar value={'wishList'} />
    </div>
  );
};

export default WishList;
