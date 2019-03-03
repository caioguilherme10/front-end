import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    pos: {
      marginBottom: 12,
    },
    cssLabel: {
      '&$cssFocused': {
        color: purple[500],
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: purple[500],
      },
    },
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: purple[500],
      },
    },
  };

  function CustomizedInputs(props) {
    const { classes , nome , handleChange } = props;
  
    return (
      <div className={classes.root}>
        <FormControl fullWidth>
          <InputLabel
            htmlFor="custom-css-standard-input"
            //classes={{
            //  root: classes.cssLabel,
            //  focused: classes.cssFocused,
            //}}
          >
            {nome}
          </InputLabel>
          <Input
            id="custom-css-standard-input"
            //classes={{
            //  underline: classes.cssUnderline,
            //}}
            onChange={handleChange}
          />
        </FormControl>
      </div>
    );
  }
  
  CustomizedInputs.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CustomizedInputs);