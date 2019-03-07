import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';

import Button from '../components/button';
import { FirebaseDB , FirebaseAuth } from '../firebase/index';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit,
    //width: 200,
  },
  menu: {
    //width: 200,
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

const currencies = [
  {
    value: 'IFPB',
    label: 'IFPB',
  },
  {
    value: 'UFCG',
    label: 'UFCG',
  },
  {
    value: 'FSM',
    label: 'FSM',
  },
  {
    value: 'OUTROS',
    label: 'OUTROS',
  },
  {
    value: 'EECITC',
    label: 'EECITC',
  },
];


class PersistentDrawerLeft extends React.Component {
  constructor (){
    super()
    this.state = {
      open: false,
      currency: 'OUTROS',
      filaName: 'fila',
      ordemFila: [],
      filaOUTROS: [],
      filaUFCG: [],
      filaFSM: [],
      filaEECITC: [],
      filaIFPB: [],
      verResultado: false
    };

    this.handleClickI = this.handleClickI.bind(this);
  
  }

  names = (sectionId) => {
    let namess = `${this.state.filaName}${sectionId}`;
    let array = [];
    if(namess === 'filaOUTROS'){
      array = this.state.filaOUTROS;
    }
    if(namess === 'filaUFCG'){
      array = this.state.filaUFCG;
    }
    if(namess === 'filaFSM'){
      array = this.state.filaFSM;
    }
    if(namess === 'filaEECITC'){
      array = this.state.filaEECITC;
    }
    if(namess === 'filaIFPB'){
      array = this.state.filaIFPB;
    }
    return array;
  } 

  componentWillMount () {

  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    localStorage.removeItem("userName");
    localStorage.setItem("user", false);
    FirebaseAuth.signOut();
    window.location.href = "http://localhost:3000/"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  async handleClickI(){

    const self = this
    const nome = localStorage.getItem('userName');
    const nome3 = this.state.currency;

    let array2 = ['' + nome];

    await this.setState({
      filaOUTROS: [],
      filaUFCG: [],
      filaFSM: [],
      filaEECITC: [],
      filaIFPB: []
    });

    if(nome3 === 'OUTROS'){
      await FirebaseDB.ref('fila/-L_FinAVVvA0oeQD9tpR').child('filaOUTROS').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let array = ['' + childSnapshot.val()];
          self.setState({
            filaOUTROS: self.state.filaOUTROS.concat(array),
          });
        });
      });
      await this.setState({
        filaOUTROS: self.state.filaOUTROS.concat(array2),
      });

      let fila1 = this.state.filaOUTROS;
      let filaL = this.state.filaOUTROS.length;
      let fila2 = [];

      for(let i=0; i<filaL; i++){
        let x = fila1[Math.floor(Math.random()*fila1.length)];
        fila2.push(x);
        let a = fila1.indexOf(x);
        fila1.splice(a,1);
      }
      //falta o TRANSACTION
      FirebaseDB.ref('fila/-L_FinAVVvA0oeQD9tpR').set({
        filaOUTROS : fila2,
      });

    }
    if(nome3 === 'UFCG'){
      await FirebaseDB.ref('fila/-L_Iw86swPN6dJzbhrFW').child('filaUFCG').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let array = ['' + childSnapshot.val()];
          self.setState({
            filaUFCG: self.state.filaUFCG.concat(array),
          });
        });
      });
      await this.setState({
        filaUFCG: self.state.filaUFCG.concat(array2),
      });

      let fila1 = this.state.filaUFCG;
      let filaL = this.state.filaUFCG.length;
      let fila2 = [];

      for(let i=0; i<filaL; i++){
        let x = fila1[Math.floor(Math.random()*fila1.length)];
        fila2.push(x);
        let a = fila1.indexOf(x);
        fila1.splice(a,1);
      }

      //falta o TRANSACTION
      FirebaseDB.ref('fila/-L_Iw86swPN6dJzbhrFW').set({
        filaUFCG : fila2,
      });
      
    }
    if(nome3 === 'FSM'){
      await FirebaseDB.ref('fila/-L_KvHMY5rrXBjwpobxh').child('filaFSM').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let array = ['' + childSnapshot.val()];
          self.setState({
            filaFSM: self.state.filaFSM.concat(array),
          });
        });
      });
      await this.setState({
        filaFSM: self.state.filaFSM.concat(array2),
      });

      let fila1 = this.state.filaFSM;
      let filaL = this.state.filaFSM.length;
      let fila2 = [];

      for(let i=0; i<filaL; i++){
        let x = fila1[Math.floor(Math.random()*fila1.length)];
        fila2.push(x);
        let a = fila1.indexOf(x);
        fila1.splice(a,1);
      }

      //falta o TRANSACTION
      FirebaseDB.ref('fila/-L_KvHMY5rrXBjwpobxh').set({
        filaFSM : fila2,
      });
      
    }
    if(nome3 === 'EECITC'){
      await FirebaseDB.ref('fila/-L_KwQCWNkNa7l8csfIF').child('filaEECITC').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let array = ['' + childSnapshot.val()];
          self.setState({
            filaEECITC: self.state.filaEECITC.concat(array),
          });
        });
      });
      await this.setState({
        filaEECITC: self.state.filaEECITC.concat(array2),
      });

      let fila1 = this.state.filaEECITC;
      let filaL = this.state.filaEECITC.length;
      let fila2 = [];

      for(let i=0; i<filaL; i++){
        let x = fila1[Math.floor(Math.random()*fila1.length)];
        fila2.push(x);
        let a = fila1.indexOf(x);
        fila1.splice(a,1);
      }

      //falta o TRANSACTION
      FirebaseDB.ref('fila/-L_KwQCWNkNa7l8csfIF').set({
        filaEECITC : fila2,
      });
      
    }
    if(nome3 === 'IFPB'){
      await FirebaseDB.ref('fila/-L_KwSbgIDFLGrDavADl').child('filaIFPB').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          let array = ['' + childSnapshot.val()];
          self.setState({
            filaIFPB: self.state.filaIFPB.concat(array),
          });
        });
      });
      await this.setState({
        filaIFPB: self.state.filaIFPB.concat(array2),
      });

      let fila1 = this.state.filaIFPB;
      let filaL = this.state.filaIFPB.length;
      let fila2 = [];

      for(let i=0; i<filaL; i++){
        let x = fila1[Math.floor(Math.random()*fila1.length)];
        fila2.push(x);
        let a = fila1.indexOf(x);
        fila1.splice(a,1);
      }

      //falta o TRANSACTION
      FirebaseDB.ref('fila/-L_KwSbgIDFLGrDavADl').set({
        filaIFPB : fila2,
      });
      
    }

  };

  handleClickR = () => {
    const self = this

    FirebaseDB.ref('ordemfila').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach((values) => {
          let array = ['' + values.val()];
          self.setState({
            ordemFila: self.state.ordemFila.concat(array),
          })
        });
      });;
    });

    FirebaseDB.ref('fila/-L_FinAVVvA0oeQD9tpR').child('filaOUTROS').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let array = ['' + childSnapshot.val()];
        self.setState({
          filaOUTROS: self.state.filaOUTROS.concat(array),
        });
      });
    });
    
    FirebaseDB.ref('fila/-L_Iw86swPN6dJzbhrFW').child('filaUFCG').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let array = ['' + childSnapshot.val()];
        self.setState({
          filaUFCG: self.state.filaUFCG.concat(array),
        });
      });
    });

    FirebaseDB.ref('fila/-L_KvHMY5rrXBjwpobxh').child('filaFSM').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let array = ['' + childSnapshot.val()];
        self.setState({
          filaFSM: self.state.filaFSM.concat(array),
        });
      });
    });

    FirebaseDB.ref('fila/-L_KwQCWNkNa7l8csfIF').child('filaEECITC').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let array = ['' + childSnapshot.val()];
        self.setState({
          filaEECITC: self.state.filaEECITC.concat(array),
        });
      });
    });

    FirebaseDB.ref('fila/-L_KwSbgIDFLGrDavADl').child('filaIFPB').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let array = ['' + childSnapshot.val()];
        self.setState({
          filaIFPB: self.state.filaIFPB.concat(array),
        });
      });
    });

    this.setState({
      verResultado: true,
    })

  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    const name = 'Sair';
    const nameButton = 'Inscreva-se';
    const corbutton = 'secondary';
    const corbuttonS = 'primary';
    const nameButtonR = 'Resultado';

    const style = {
      padding: '50px 0px 0px',
    }

    const style1 = {
      margin: 'auto',
      alignItems: 'center',
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Nome do software
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Nome', 'informações', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Sair'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
            <div style={style}>
              <Grid container spacing={8}>
                <Grid item sm={6}>
                  <Card>
                    <CardContent>
                      <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        fullWidth
                        className={classes.textField}
                        value={this.state.currency}
                        onChange={this.handleChange('currency')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        //helperText="Please select your currency"
                        //margin="normal"
                      >
                      {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                      </TextField>
                    </CardContent>
                    <CardActions>
                      <div style={style1}>
                        <Button name={nameButton} cor={corbutton} handleClick={this.handleClickI}></Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item sm={6}>
                  <Card>
                    <CardContent>
                      {this.state.verResultado  && <List className={classes.root2} subheader={<li />}>
                        {this.state.ordemFila.map(sectionId => (
                          <li key={`section-${sectionId}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                              <ListSubheader>{`${sectionId}`}</ListSubheader>
                              {this.names(sectionId).map(item => (
                                <ListItem key={`item-${sectionId}-${item}`}>
                                  <ListItemText primary={`${item}`} />
                                </ListItem>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </List>}
                    </CardContent>
                    <CardActions>
                      <div style={style1}>
                        <Button name={nameButtonR} cor={corbuttonS} handleClick={this.handleClickR}></Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </div>
            <Button name={name} cor={corbuttonS} handleClick={this.handleClick}></Button>          
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);