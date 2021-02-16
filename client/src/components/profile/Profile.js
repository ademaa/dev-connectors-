import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileById} from '../../action/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileCertification from './ProfileCertification';
import ProfileGithub from './ProfileGithub';

const Profile = ({match,profile:{profile,loading},auth,getProfileById}) => {
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById,match.params.id])
    return (
        <Fragment>
            {profile === null && loading ?(<Spinner/>):(
                <Fragment>
                <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
                {auth.isAuthanticated && auth.loading === false && auth.user._id === 
                profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}
                <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                </div>
                <div className="profile-exp bg-white p-2">
                <p className="text-primary">Experience</p>
                    {profile.experience.length > 0 ?(<Fragment>
                        {profile.experience.map(exp => (
                            <ProfileExperience key={exp._id}
                            experience={exp}
                             />
                        ))}
                    </Fragment>):(
                        <h4>No experience credentials</h4>)}
                </div>
                <div className="profile-edu bg-white p-2">
                <p className="text-primary">Education</p>
                {profile.education.length > 0 ?(<Fragment>
                    {profile.education.map(edu=>(
                        <ProfileEducation key={edu._d}
                        education={edu} />
                    ))}
                </Fragment>):(<h4>No education credentials</h4>)
                }
            </div>
            <div className="profile-edu bg-white p-2">
                <p className="text-primary">Certifications</p>
                {profile.certifications.length > 0 ?(<Fragment>
                    {profile.certifications.map(cer=>(
                        <ProfileCertification key={cer._d}
                        certification={cer} />
                    ))}
                </Fragment>):(<h4>No certification credentials</h4>)
                }
            </div>
            {profile.githubUserName && 
                <ProfileGithub username={profile.githubUserName}/>
            }
            
            </Fragment>) }
        </Fragment>
    )
}

Profile.propTypes = {
getProfileById:PropTypes.func.isRequired,
profile:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToProps,{getProfileById})(Profile);
