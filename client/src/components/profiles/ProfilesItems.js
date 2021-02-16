import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ProfilesItems = ({profile:{
user:{_id,name,avatar},
status,
company,
location,
skills
}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="avatar" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span> }</p>
                <p className="my-1">{location && <span>{location}</span> }</p>
                <Link to={`/profile/user/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {skills.slice(0,3).map((skill,index)=>(
                    <li className="text-primary" key={index}>
                        <span className="fas fa-check"></span> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfilesItems.propTypes = {
profile:PropTypes.object.isRequired
}

export default ProfilesItems
