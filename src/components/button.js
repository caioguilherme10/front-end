import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  
});

function ContainedButtons(props) {
  const { name , handleClick } = props;
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {name}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);