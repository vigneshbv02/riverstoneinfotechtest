import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Snackbar} from '@material-ui/core'

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} style={{padding: '2px', margin: '5px', backgroundColor: 'red', maxWidth: '50vh', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);