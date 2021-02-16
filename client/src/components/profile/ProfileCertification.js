import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileCertification = ({certification:{
name,
organization,
start,
end,
description
}}) => (
    <div>
            <h3>{name}</h3>
            <Moment format="YYYY/MM/DD">{start}</Moment> - {!end ? " Now":(
                <Moment format="YYYY/MM/DD">{end}</Moment>)}
            <p><strong>Organization: </strong>{organization}</p>
            {description && <p>
              <strong>Description: </strong> {description}
            </p>}
          </div>
)

ProfileCertification.propTypes = {
    certification:PropTypes.array.isRequired
}

export default ProfileCertification
