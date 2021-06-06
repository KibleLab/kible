import AppBar from '../components/AppBar';
import Frame from '../components/Frame';
import MenuButton from '../components/MenuButton';
import NavBar from '../components/NavBar';

const MenuSelect = ({match}) => {
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'Menu'} />
      <Frame
        backColor={'white'}
        height={'auto'}
        top={'4rem'}
        bottom={'4rem'}
        padding={'0.5rem'}
      ></Frame>
      <NavBar value={'menu'} table_no={table_no} />
    </div>
  );
};

export default MenuSelect;
