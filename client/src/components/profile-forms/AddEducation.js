import React,{Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import {addEducation} from '../../action/profile';

const AddEducation = ({addEducation,history}) => {
    const [formData,setFormDate] = useState({
        school:'',
        degree:'',
        start:'',
        end:'',
        grade:'',
        description:'',
        current:false
    });
    const {school,degree,start,end,grade,description,current} = formData;
    const [disableCurrent,toggleCurrent] = useState(false);
    const onChange = e => setFormDate({...formData,[e.target.name]:e.target.value});

    return (
        <Fragment>
            <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e=>{
          e.preventDefault();
          addEducation(formData,history);
      }}>
        <div class="form-group">
          <input
            value={school}
            onChange={e=>onChange(e)}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div class="form-group">
          <input
           value={degree}
            onChange={e=>onChange(e)}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div class="form-group">
          <input
           value={grade}
            onChange={e=>onChange(e)}
            type="text"
            placeholder=" grade"
            name="grade"
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="start" value={start}
            onChange={e=>onChange(e)} />
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="current" value={current}
            onChange={e=>{
                setFormDate({...formData,current:!current});
                toggleCurrent(!disableCurrent);
            }} /> Current School or Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="end" value={end}
            onChange={e=>onChange(e)} disabled={disableCurrent && 'disabled'} />
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

AddEducation.propTypes = {
addEducation:PropTypes.func.isRequired
}

export default connect(null,{addEducation})(withRouter(AddEducation))
