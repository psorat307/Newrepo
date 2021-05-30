import React, {useState} from 'react' ;
//import {useEffect} from 'redux' ;
import {Link, useLocation} from 'react-router-dom' ;
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import memories from '../../images/memories.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history= useHistory();
    // eslint-disable-next-line
    const location= useLocation();

    const logout =()=>{
        dispatch({type: 'LOGOUT'});

        history.push('/');
        setUser(null);
    };

    // useEffect(()=>{
    //     // eslint-disable-next-line
    //     const token = user.token;

    //     setUser(JSON.parse(localStorage.getItem('profile')));
    // },[location])

    return(
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography component ={Link} to ="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src="user.result.name.charAt(0)"></Avatar>
                    <Typography className ={classes.userName} variant="h6">{user.result.name} </Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>

            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}

        </Toolbar>
      </AppBar>
      );
};

export default Navbar;