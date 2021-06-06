import {makeStyles} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: (props) => ({
    background: 'rgba(250, 255, 0, 0.25)',
    width: '100%',
    height: '6rem',
    padding: '1rem',
    borderRadius: '5px',
    verticalAlign: 'middle',
    marginTop: props.top,
  }),
  name: {
    width: '70%',
    height: '50%',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'left',
    float: 'left',
  },
  quantity: {
    width: '30%',
    height: '50%',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
  },
  price: {
    width: '100%',
    height: '50%',
    paddingTop: '0.5em',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
  },
});

const OrderMenu = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography className={classes.name}>{props.name}1</Typography>
      <Typography className={classes.quantity}>
        ×{Number(props.quantity).toLocaleString()}
      </Typography>
      <Typography className={classes.price}>{Number(props.price).toLocaleString()}원</Typography>
    </Container>
  );
};

export default OrderMenu;
