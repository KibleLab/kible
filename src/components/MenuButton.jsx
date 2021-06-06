import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core';
import Typography from '@material-ui/core';

const useStyles = makeStyles({
  root: (props) => ({
    background: '#FFC37C',
    width: '100%',
    height: '5rem',
    padding: '5%',
    paddingTop: '1.8rem',
    paddingBottom: '1.8rem',
    borderRadius: '5px',
    verticalAlign: 'middle',
    marginTop: props.top,
  }),
  name: {
    width: '60%',
    height: '100%',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'left',
    float: 'left',
  },
  price: {
    width: '40%',
    height: '100%',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
  },
});

const MenuButton = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.root} maxWidth={false} onClick={props.onClick}>
      <Typography className={classes.name}>{props.name}</Typography>
      <Typography className={classes.price}>{Number(props.price).toLocaleString()}원</Typography>
    </Container>
  );
};

export default MenuButton;
