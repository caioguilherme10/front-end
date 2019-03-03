import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    //margin: theme.spacing.unit,
  },
});

function ContainedButtons(props) {
  const { classes , name , handleClick } = props;
  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
        {name}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);