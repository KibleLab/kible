import {makeStyles} from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import AppBar from '../components/AppBar';
import NavBar from '../components/NavBar';

const MenuSelect = ({match}) => {
  const classes = useStyles();
  const table_no = match.params.table_no;
  return (
    <div>
      <AppBar name={'Menu'} />
      <Container className={classes.body} maxWidth={false}>
        {/*여기에 map으로 처리된 부분*/}
      </Container>
      <NavBar value={'menu'} table_no={table_no} />
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
