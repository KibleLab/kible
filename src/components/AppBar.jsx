import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const AppBar = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography className={classes.name}>{props.name}</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    background: 'white',
    width: '100%',
    height: '4rem',
    left: 0,
    top: 0,
    borderBottom: '1px solid #a1a1a1',
  },
  name: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    color: 'black',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppBar;
