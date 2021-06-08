import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

const WishList = ({match}) => {
  const classes = useStyles();
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'찜목록'} />
      <Container className={classes.body} maxWidth={false}>
        {/*여기에 map으로 처리된 부분*/}
      </Container>
      <Container className={classes.buttonC} maxWidth={false}>
        <Button className={classes.button} href={'/OrderSheet/' + table_no}>
          주문서에 추가
        </Button>
      </Container>
      <NavBar value={'wishList'} table_no={table_no} />
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
    bottom: '8rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingBottom: '0.5rem',
    overflowY: 'auto',
  },
  buttonC: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    height: 'auto',
    left: 0,
    bottom: '4rem',
    padding: '0.5rem',
    borderTop: '1px solid #a1a1a1',
  },
  button: {
    background: '#FF006B',
    width: '100%',
    height: '100%',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: '10px',
    '&:hover': {backgroundColor: '#FF006B'},
  },
});

export default WishList;
