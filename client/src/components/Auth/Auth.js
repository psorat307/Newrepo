import React,{useState} from 'react' ;
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input' ;
import Icon from './icon';

const Auth = () => {
    const classes=useStyles();
    const [showPassword, setShowPassword]=useState(false);
    const [isSignup, setIsSignup]= useState(false);
    const dispatch = useDispatch();
    const history= useHistory();

    const handleShowPassword=()=>setShowPassword((prevShowPassword)=> !prevShowPassword);

    const handleSubmit= ()=>{

    };

    const switchMode= ()=>{
            setIsSignup((prevIsSignup) => !prevIsSignup);
            handleShowPassword(false);
    };

    const handleChange= ()=>{

    };

    const googleSuccess= async (res)=>{
        const result =res?.profileObj;
        const token =res?.tokenId;
        try {
            dispatch({type:'AUTH',data :{result,token}});

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure= (error)=>{
        console.log(error);
        console.log("Google Sign In was unsuccesful. Try Again Later");

    };
    
    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ?'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} half />
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}  >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="526218300941-vn3ff29l70h2a6d234mogc15001c4ae7.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick } disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ?'Already have a account? Sign In':"Don't have a n account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
};

export default Auth;