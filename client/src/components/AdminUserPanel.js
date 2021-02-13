import React from 'react'
import { connect } from 'react-redux'
import { updateUserStatus, getAllUsers } from '../actions/admin';
import { PropTypes } from 'prop-types';
import { Button, Card, CardActionArea, CardContent, CardActions, Typography } from '@material-ui/core';

const AdminUserPanel = ({ userData, updateUserStatus, getAllUsers }) => {

    const { _id, name, email, isactive } = userData;


    const onClick = (e) => {
        if (e.target.innerText === 'ACTIVATE') {
            updateUserStatus(_id, 'true');
        } else if (e.target.innerText === 'DEACTIVATE') {
            updateUserStatus(_id, 'false');
        }
        getAllUsers();
    }

    return (
        <Card style={{ margin: '5px', backgroundColor: isactive === true ? '#00800038' : '#ff0f0f6e' }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2"> {name} </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"> {email} </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"> {isactive} </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button disabled={isactive === true} size="small" color="primary" onClick={onClick} title="activate"> Activate </Button>
                <Button disabled={isactive === false} size="small" color="primary" onClick={onClick} title="deactivate"> Deactivate </Button>
            </CardActions>
        </Card>
    )
}

AdminUserPanel.propTypes = {
    userData: PropTypes.object.isRequired,
    updateUserStatus: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    updateUserStatus,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPanel)
