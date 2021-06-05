import AppBar from '../components/AppBar';
import BodyFrame from '../components/BodyFrame';
import NavBar from '../components/NavBar';

const MenuSelect = ({match}) => {
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'Menu'} />
      <BodyFrame></BodyFrame>
      <NavBar value={'menu'} table_no={table_no} />
    </div>
  );
};

export default MenuSelect;
