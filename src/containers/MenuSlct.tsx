import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RootDispatch, RootState } from '..';
import { ContainerProps, MenuData } from '../types/containers';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import MenuButton from '../components/MenuButton';

import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { menuMgntActions } from '../reducers/menuMgnt';
import { menuSlctActions } from '../reducers/menuSlct';
import { wishListActions } from '../reducers/wishList';
import { orderSheetActions } from '../reducers/orderSheet';

const MenuSelect: FC<ContainerProps> = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { menu, wish, order, isDone_menu, isDone_wish } = useSelector(
    (state: RootState) => ({
      menu: [...state.menuSlct.data],
      wish: [...state.wishList.data[Number(table)]],
      order: [...state.orderSheet.data[Number(table)]],
      isDone_menu: state.menuSlct.isDone,
      isDone_wish: state.wishList.isDone,
    }),
    shallowEqual,
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(menuMgntActions.getMenu_request());
    dispatch(menuSlctActions.getMenu_request());
    dispatch(wishListActions.getWish_request({ table }));
    dispatch(orderSheetActions.getOrder_request({ table }));
  }, [dispatch, table]);

  const addWish = (menuData: MenuData) => {
    if (isDone_menu === true && isDone_wish === true) {
      const index = wish.findIndex((wish) => wish.menu_name === menuData.menu_name);
      if (index === -1) {
        dispatch(wishListActions.addWish_request({ table, menuData }));
        dispatch(menuSlctActions.stockDecr_request({ menuData }));
      } else {
        setMessage('이미 추가된 메뉴입니다.');
        setOpen(true);
      }
    }
    dispatch(menuSlctActions.getMenu_request());
    dispatch(wishListActions.getWish_request({ table }));
  };

  const menuButtonList = (): any => {
    if (isDone_menu === true && isDone_wish === true)
      return menu.map((data, index) => (
        <MenuButton
          onClick={() => addWish(data)}
          key={index}
          name={data.menu_name}
          stock={data.menu_stock}
          price={data.menu_price}
        />
      ));
  };

  return (
    <div>
      <Helmet>
        <title>메뉴 선택 - Kible Mobile System</title>
      </Helmet>
      <AppBar name={'Menu'} />
      <Container className={classes.body} maxWidth={false}>
        {menuButtonList()}
      </Container>
      <NavBar value={'menu'} table_no={table} badge_wish={wish.length} badge_order={order.length} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        message={message}
        action={
          <IconButton aria-label='close' style={{ color: 'yellow' }} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};

const useStyles = makeStyles({
  body: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    height: 'auto',
    left: 0,
    top: '4rem',
    bottom: '4rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingBottom: '0.5rem',
    overflowY: 'auto',
  },
});

export default MenuSelect;
