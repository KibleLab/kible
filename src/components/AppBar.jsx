import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    // background: 'white',
    position: 'fixed',
    width: '100%',
    height: '4rem',
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
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
});
const AppBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p className={classes.name}>{props.name}</p>
    </div>
  );
};

export default AppBar;
