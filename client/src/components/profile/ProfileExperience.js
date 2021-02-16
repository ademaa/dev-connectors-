import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experience:{
    title,
    company,
    location,
    from,
    to,
    description
}}) => (
    <div>
            <h3 class="text-dark">{company}</h3>
            <Moment format="YYYY/MM/DD">{from}</Moment> - {!to?" Now":(
                <Moment format="YYYY/MM/DD">{to}</Moment>)}
            <p><strong>Position: </strong>{title}</p>
            {description && <p>
              <strong>Description: </strong>{description}
            </p>}
            {location && <p><strong>Location: </strong>{location}</p>}
          </div>
)

ProfileExperience.propTypes = {
experience:PropTypes.array.isRequired
}

export default ProfileExperience
