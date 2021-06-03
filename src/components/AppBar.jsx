import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%',
    height: '8%',
    left: 0,
    top: 0,
    borderBottom: '1px solid #a1a1a1',
  },
  name: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
const AppBar = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="fixed" disableGutters="true">
      <p className={classes.name}>{props.name}</p>
    </Container>
  );
};

export default AppBar;
