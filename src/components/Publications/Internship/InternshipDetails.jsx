
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
 
const InternshipDetails = (props) => {
    const { internship } = props; 
    if (internship) {
        return (
            <div style={{textAlign:'center', marginRight: 250, marginTop:"250px",
                borderRadius:"10px",borderStyle:"solid",borderColor:"#dee2e8",borderWidth:"1px"}}>
                <div>
                    <div>
                        <h1 style={{fontSize: 40}}>{ internship.title }</h1>
                        <p style={{fontSize: 20}}>Internship description: <br/> { internship.description }</p>
                        <p style={{fontSize: 20}}>Internship position: <br/> { internship.duration }</p>
                        <p style={{fontSize: 20}}>Available positions: <br/> { internship.technology }</p>
                        <Link to = {'/companyDetails/' + internship.authorId}>
                            <p>Published by: {internship.internshipAuthorName} </p>
                        </Link>
                        <p>Published:  {moment(internship.createdAt).format('MMMM Do YYYY h:mm:ss a')}</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{textAlign: 'center', marginRight: 250}}>
                <p>Loading internship...</p>
            </div>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const internships = state.firestore.data.internships;
    const internship = internships ? internships[id] : null
    return {
        internship: internship
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'internships' }
    ])
)(InternshipDetails)