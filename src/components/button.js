import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  
});

function ContainedButtons(props) {
  const { cor , name , handleClick } = props;
  return (
    <div>
      <Button variant="contained" color={cor} onClick={handleClick}>
        {name}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);