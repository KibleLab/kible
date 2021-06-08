import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const OrderMenu = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography className={classes.name}>{props.name}</Typography>
      <Typography className={classes.quantity}>
        ×{Number(props.quantity).toLocaleString()}
      </Typography>
      <Typography className={classes.price}>{Number(props.price).toLocaleString()}원</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: (props) => ({
    position: 'relative',
    background: 'rgba(250, 255, 0, 0.25)',
    width: '100%',
    height: '6rem',
    padding: '1rem',
    borderRadius: '5px',
    marginTop: '0.5rem',
  }),
  name: {
    position: 'absolute',
    left: '1rem',
    top: '1rem',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'left',
    float: 'left',
  },
  quantity: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
  },
  price: {
    position: 'absolute',
    right: '1rem',
    bottom: '1rem',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
  },
});

export default OrderMenu;
