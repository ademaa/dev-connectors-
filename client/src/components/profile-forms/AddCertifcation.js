import React,{Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {addCertification} from '../../action/profile';

const AddCertification = ({addCertification,history}) => {
    const [formData,setFormDate] = useState({
        name:'',
        organization:'',
        start:'',
        end:'',
        description:'',
        expiration:false
    });
    const {name,organization,start,end,description,expiration} = formData;
    const [disableExpiration,toggleExpiration] = useState(false);
    const onChange = e => setFormDate({...formData,[e.target.name]:e.target.value});

    return (
        <Fragment>
            <h1 class="large text-primary">
        Add Your Certifications
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e=>{
          e.preventDefault();
          addCertification(formData,history);
      }}>
        <div class="form-group">
          <input
            value={name}
            onChange={e=>onChange(e)}
            type="text"
            placeholder="* School or Bootcamp"
            name="name"
          />
        </div>
        <div class="form-group">
          <input
           value={organization}
            onChange={e=>onChange(e)}
            type="text"
            placeholder="* Degree or Certificate"
            name="organization"
          />
        </div>
        <div class="form-group">
          <h4>Start Date</h4>
          <input type="date" name="start" value={start}
            onChange={e=>onChange(e)} />
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="expiration" value={expiration}
            onChange={e=>{
                setFormDate({...formData,expiration:!expiration});
                toggleExpiration(!disableExpiration);
            }} /> No Expiration Date
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="end" value={end}
            onChange={e=>onChange(e)} disabled={disableExpiration && 'disabled'} />
        </div>
        <div class="form-group">
          <textarea
          value={description}
            onChange={e=>onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

AddCertification.propTypes = {
    addCertification:PropTypes.func.isRequired
}

export default connect(null,{addCertification})(withRouter(AddCertification))
