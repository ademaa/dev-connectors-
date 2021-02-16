import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
const ProfileEducation = ({education:{
school,
degree,
grade,
start,
end,
description
}}) => (
    <div>
            <h3>{school}</h3>
            <Moment format="YYYY/MM/DD">{start}</Moment> - {!end ? " Now":(
                <Moment format="YYYY/MM/DD">{end}</Moment>)}
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Grade: </strong>{grade}</p>
            {description && <p>
              <strong>Description: </strong> {description}
            </p>}
          </div>
)

ProfileEducation.propTypes = {
education:PropTypes.array.isRequired
}

export default ProfileEducation
