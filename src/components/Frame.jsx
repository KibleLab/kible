import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: (props) => ({
    backgroundColor: props.backColor,
    position: 'fixed',
    width: '100%',
    height: props.height,
    left: 0,
    padding: '2%',
    top: props.top,
    bottom: props.bottom,
    overflowY: 'auto',
    borderRadius: props.radius,
    borderTop: props.borderTop,
    borderBottom: props.borderBottom,
    borderLeft: props.borderLeft,
    borderRight: props.borderRight,
  }),
});

const Frame = (props) => {
  const classes = useStyle(props);
  return <Container className={classes.root} children={props.children} maxWidth={false} />;
};

export default Frame;
