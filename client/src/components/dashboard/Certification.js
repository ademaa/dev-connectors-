import React,{Fragment}from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteCertification} from '../../action/profile';
const Certification = ({certification,deleteCertification}) => {
    const certifications = certification.map(cer =>(
        <tr key={cer._id}>
            <td>{cer.name}</td>
            <td className="hide-sm">{cer.organization}</td>
            <td><Moment format="YYYY/MM/DD">{cer.start}</Moment> -
                {
                    cer.end === null ? ('Now'):(<Moment format="YYYY/MM/DD">{cer.end}</Moment>)
                }
            </td>
            <td><button onClick={()=>deleteCertification(cer._id)} className="btn btn-danger">delete</button></td>
        </tr>
    ));
    return (
        <Fragment>
            <h1 className="my-2">Certification Credintials</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="hide-sm">organization</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{certifications}</tbody>
            </table>
        </Fragment>
    )
}

Certification.propTypes = {
    certification:PropTypes.array.isRequired,
    deleteCertification:PropTypes.func.isRequired
}

export default connect(null,{deleteCertification})(Certification)
