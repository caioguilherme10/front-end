import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import Bar from '../components/appbar';
import Card from '../components/cardlogin';

class Login extends Component {

    render() {
        
        const style = {
            padding: '50px 0px 0px',
        }

        const name = 'Login';

        return (
        <div>
            <Bar name={name}></Bar>
            <div style={style}>
                <Grid container spacing={8}>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}>
                        <Card></Card>
                    </Grid>
                    <Grid item sm={4}></Grid>
                </Grid>
            </div>
        </div>
        );
    }
}

export default Login;