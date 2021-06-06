import {makeStyles} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {Typography} from '@material-ui/core';

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography className={classes.title}>Error :(</Typography>
      <Typography className={classes.info}>테이블의 QR코드를 다시 스캔해주세요!</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    background: 'rgba(0, 255, 117, 0.25)',
    width: '100%',
    height: 'auto',
    left: 0,
    top: 0,
    bottom: 0,
    padding: 0,
  },
  title: {
    position: 'fixed',
    width: '100%',
    color: 'red',
    top: '5rem',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    position: 'fixed',
    width: '100%',
    color: 'black',
    bottom: '5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ErrorPage;
