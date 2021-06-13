import {makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useEffect, useState} from 'react';
import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';
import MenuButton from '../components/MenuButton';

import {useDispatch, useSelector} from 'react-redux';
import {addWish, getMenu, stockDecr} from '../reducers/menuSelect';
import {getOS} from '../reducers/orderSheet';

const MenuSelect = ({match}) => {
  const classes = useStyles();
  const {table_no} = match.params;
  const menu = useSelector((state) => [...state.menuSelect.menu]);
  const wish = useSelector((state) => [...state.menuSelect.wish]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu(table_no));
  }, [dispatch, table_no]);

  useEffect(() => {
    dispatch(getOS(table_no));
  }, [dispatch, table_no]);

  const sendWish = (data) => {
    if (wish.length <= 0) {
      dispatch(addWish(data));
      dispatch(stockDecr(data));
    } else if (wish.length > 0) {
      const index = wish.findIndex((wish) => wish.menu_no === data.menu_no);
      if (index === -1) {
        dispatch(addWish(data));
        dispatch(stockDecr(data));
      } else {
        setMessage('이미 추가된 메뉴입니다.');
        setOpen(true);
      }
    }
  };

  const menuButtonList = menu.map((data) => (
    <MenuButton onClick={() => sendWish(data)} name={data.menu_name} price={data.menu_price} />
  ));
  return (
    <div>
      <AppBar name={'Menu'} />
      <Container className={classes.body} maxWidth={false}>
        {menuButtonList}
      </Container>
      <NavBar value={'menu'} table_no={table_no} badge={wish.length} />
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
          <IconButton
            aria-label="close"
            style={{color: 'yellow'}}
            className={classes.close}
            onClick={() => setOpen(false)}
          >
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
