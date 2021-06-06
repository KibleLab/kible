import {makeStyles} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Typography} from '@material-ui/core';

const MenuButton = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.root} maxWidth={false} onClick={props.onClick}>
      <Typography className={classes.name}>{props.name}</Typography>
      <Typography className={classes.price}>{Number(props.price).toLocaleString()}원</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: (props) => ({
    position: 'relative',
    background: '#FFC37C',
    width: '100%',
    height: '5rem',
    padding: '1rem',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    marginTop: props.top,
  }),
  name: {
    position: 'absolute',
    left: '1rem',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'left',
    float: 'left',
  },
  price: {
    position: 'absolute',
    right: '1rem',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
  },
});

export default MenuButton;
