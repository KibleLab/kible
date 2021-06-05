import {Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'white',
    position: 'fixed',
    width: '100%',
    height: '4rem',
    left: 0,
    top: 0,
    borderBottom: '1px solid #a1a1a1',
  },
  name: {
    position: 'fixed',
    width: '100%',
    height: '4rem',
    left: 0,
    top: '1.5rem',
    color: 'black',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
});
const AppBar = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography className={classes.name} variant="h6" gutterBottom>
        {props.name}
      </Typography>
    </Container>
  );
};

export default AppBar;
