import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: (props) => ({
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: 'auto',
    left: 0,
    padding: '2%',
    top: props.top,
    bottom: props.bottom,
    overflowY: 'auto',
  }),
});

const Frame = (props) => {
  const classes = useStyle(props);
  return <Container className={classes.root} children={props.children} maxWidth={false} />;
};

export default Frame;
