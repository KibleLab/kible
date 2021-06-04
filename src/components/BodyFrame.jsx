import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: {
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: '100% - 8.2rem',
    left: 0,
    top: '4.1rem',
    bottom: '4.1rem',
  },
});

const BodyFrame = (props) => {
  const classes = useStyle();
  return <Container className={classes.root} children={props.children} maxWidth={'false'} />;
};

export default BodyFrame;
