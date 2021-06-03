import AppBar from '../components/AppBar';
import BodyFrame from '../components/BodyFrame';
import NavBar from '../components/NavBar';

const MenuSelect = () => {
  return (
    <div>
      <AppBar name={'Menu'} />
      <BodyFrame></BodyFrame>
      <NavBar value={'menu'} />
    </div>
  );
};

export default MenuSelect;
