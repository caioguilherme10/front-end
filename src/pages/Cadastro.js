import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import Bar from '../components/appbar';
import Card from '../components/cardcadastro';


class Cadastro extends Component {

    render() {

        const style = {
            padding: '50px 0px 0px',
        }

        const name = 'Cadastro';

        return (
        <div>
            <Bar name={name}></Bar>
            <div style={style}>
                <Grid container spacing={8}>
                    <Grid item sm={3}></Grid>
                    <Grid item sm={6}>
                        <Card></Card>
                    </Grid>
                    <Grid item sm={3}></Grid>
                </Grid>
            </div>
        </div>
        );
    }
}

export default Cadastro;