import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const WishButton = (props) => {
  const classes = useStyles(props);

  return (
    <div>
      <Container className={classes.root} maxWidth={false} component={Button}>
        <Typography className={classes.name}>{props.name}</Typography>
        <Typography className={classes.delete} onClick={props.delete}>
          ×
        </Typography>
        <IconButton aria-label="minus" className={classes.minus} onClick={props.minus}>
          <RemoveIcon />
        </IconButton>
        <Typography className={classes.quantity}>{props.quantity}</Typography>
        <IconButton aria-label="plus" className={classes.plus} onClick={props.plus}>
          <AddIcon />
        </IconButton>
        <Typography className={classes.price}>
          {Number(props.price * props.quantity).toLocaleString()}원
        </Typography>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: '#E0FFD1',
    width: '100%',
    height: '6rem',
    padding: '1rem',
    borderRadius: '5px',
    marginTop: '0.5rem',
    '&:hover': {backgroundColor: '#E0FFD1'},
  },
  name: {
    position: 'absolute',
    left: '1rem',
    top: '1rem',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'left',
    float: 'left',
  },
  delete: {
    position: 'absolute',
    right: '1rem',
    top: '0.5rem',
    color: 'red',
    fontSize: '1.5rem',
    textAlign: 'right',
    float: 'right',
    cursor: 'pointer',
  },
  quantity: {
    position: 'absolute',
    width: '3rem',
    left: '2.5rem',
    bottom: '1rem',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'center',
  },
  price: {
    position: 'absolute',
    right: '1rem',
    bottom: '1rem',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
  },
  plus: {
    position: 'absolute',
    background: '#68DBFF',
    width: '1.5rem',
    height: '1.5rem',
    left: '5.5rem',
    bottom: '1rem',
    color: 'black',
    borderRadius: 25,
    '&:hover': {backgroundColor: '#68DBFF'},
  },
  minus: {
    position: 'absolute',
    background: '#68DBFF',
    width: '1.5rem',
    height: '1.5rem',
    left: '1rem',
    bottom: '1rem',
    color: 'black',
    borderRadius: 25,
    '&:hover': {backgroundColor: '#68DBFF'},
  },
});

export default WishButton;
