import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import Name from './formcontrol';
import Password from './password';
import ButtonP from './button';
import { useState } from 'react';

import { FirebaseDB , FirebaseAuth } from '../firebase/index';
import swal from 'sweetalert';

const styles = {
    card: {
        padding: '0px 0px 15px 5px',
    },
    button: {
        float: 'right',
    },
};

function SimpleCard(props) {
    const { classes } = props;


    //window.location.href = "http://localhost:3000/Cadastro"

    const nome = 'Nome';
    const email1 = 'Email';
    const buttonname = 'Confimar';
    const login = 'Login';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleChangeName = event => {
        setName(event.target.value);
    };

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const handleChangeSenha = event => {
        setSenha(event);
    };

    const execute = () => {
        FirebaseAuth.onAuthStateChanged(firebaseUser =>{
            if(firebaseUser){
                console.log('true')

                localStorage.setItem("userName", name);
                localStorage.setItem("user", true);

                FirebaseDB.ref('users/' + firebaseUser.uid).set({
                    name : name
                });

                window.location.href = "http://localhost:3000/Principal"
                //FirebaseAuth.signOut();
            }else{
                console.log('false')
            }
        });
    };

    const handleClick = () => {

        if(email === "" || senha === "" || nome === ""){
            swal("Preencha os campos vazios!")
        }else{
            FirebaseAuth.createUserWithEmailAndPassword(email, senha).then(success => {
                execute();
                swal("Cadastro", "feito com sucesso!", "success");
            }).catch(error => {
                swal("Cadastro","Erro a Cadastrar!", "error");
            })
        }

    };
    

    return (
        <Card>
            <CardContent>
                <Grid item xs={10}>
                    <div className={classes.card}>
                        <Name nome={nome} handleChange={handleChangeName}></Name>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.card}>
                        <Name nome={email1} handleChange={handleChangeEmail}></Name>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.card}>
                        <Password handleChangeSenha={handleChangeSenha}></Password>
                    </div>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container spacing={8}>
                    <Grid item sm={3}>
                        <Button component={Link} to="/" variant="contained" color="primary">{login}</Button>
                    </Grid>
                    <Grid item sm={9}>
                        <div className={classes.button}>
                            <ButtonP name={buttonname} handleClick={handleClick}></ButtonP>
                        </div>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);