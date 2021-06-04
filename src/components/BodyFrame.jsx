import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: {
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: 'auto',
    left: 0,
    padding: '2%',
    top: '4rem',
    bottom: '4rem',
    overflowY: 'auto',
  },
});

const BodyFrame = (props) => {
  const classes = useStyle();
  return <Container className={classes.root} children={props.children} maxWidth={'false'} />;
};

export default BodyFrame;
