import { FC } from 'react';
import { MenuButtonProps } from '../types/components';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MenuButton: FC<MenuButtonProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Container
      className={classes.root}
      maxWidth={false}
      onClick={props.onClick}
      disabled={props.stock > 0 ? false : true}
      component={Button}>
      <Typography className={classes.name}>{props.name}</Typography>
      <Typography className={classes.price}>{Number(props.price).toLocaleString()}원</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: (props: MenuButtonProps) => ({
    position: 'relative',
    background: props.stock > 0 ? '#FFC37C' : `rgba(255, 195, 124, 0.5)`,
    width: '100%',
    height: '5rem',
    padding: '1rem',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    textTransform: 'none',
    '&:hover': { backgroundColor: props.stock > 0 ? '#FFC37C' : `rgba(255, 195, 124, 0.5)` },
  }),
  name: (props: MenuButtonProps) => ({
    position: 'absolute',
    left: '1rem',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'left',
    float: 'left',
    textDecorationLine: props.stock > 0 ? '' : `line-through`,
  }),
  price: (props: MenuButtonProps) => ({
    position: 'absolute',
    right: '1rem',
    color: 'red',
    fontSize: '1rem',
    textAlign: 'right',
    float: 'right',
    textDecorationLine: props.stock > 0 ? '' : `line-through`,
  }),
});

export default MenuButton;
