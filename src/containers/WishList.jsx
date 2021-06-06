import AppBar from '../components/AppBar';
import Frame from '../components/Frame';
import {Button, makeStyles} from '@material-ui/core';
import NavBar from '../components/NavBar';

const useStyles = makeStyles({
  button: {
    background: '#FF006B',
    width: '100%',
    height: '100%',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: '10px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '&:hover': {backgroundColor: '#FF006B'},
  },
});

const WishList = ({match}) => {
  const classes = useStyles();
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'찜목록'} />
      <Frame
        backColor={'white'}
        height={'auto'}
        top={'4rem'}
        bottom={'8rem'}
        padding={'0.5rem'}
      ></Frame>
      <Frame
        backColor={'white'}
        height={'4rem'}
        bottom={'4rem'}
        borderTop={'1px solid #a1a1a1'}
        padding={'0.5rem'}
      >
        <Button className={classes.button} href={'/OrderSheet/' + table_no}>
          주문서에 추가
        </Button>
      </Frame>
      <NavBar value={'wishList'} table_no={table_no} />
    </div>
  );
};

export default WishList;
