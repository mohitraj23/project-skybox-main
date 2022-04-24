import React from 'react'
import chatImage from './Images/01.png';
import './Styles/style.css';
import Gazal from './Images/team/gazal.jpg';
import Tushar from './Images/team/tushar.jpg';
import Mohit from './Images/team/mohit.jpg';
import Ankit from './Images/team/ankit.jpg';
import CU from './Images/cu.png';

function LandingPage() {
    return (
        <>
        <div className="app">
            <div className="container">
                <div className="row space-100 mt-5 p-2">
                    <div className="col-lg-6 col-md-12 col-xs-12">
                        <div className="contents">
                            <p className="display-4 text-start text-break">
                                <strong>Welcome to Skybox.</strong><br></br>The web chat application where users are allowed to communicate in real-time using easily accessible web interfaces. 
                            </p>
                            <button className="btn btn-lg btn-primary"><a href="/login" style={{color: 'white'}}>Click me to Start Chatting.</a></button> 
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-xs-12 p-0">
                        <img src={chatImage} alt="People Chatting" className="d-sm-block d-lg-block" style={{marginLeft: "6rem"}}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
          <h1>About Us</h1><a name="about"></a>
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-5">
        <div className="col">
          <div className="card h-100">
            <img src={Ankit} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Ankit Kumar</h5>
              <p className="card-text">Role: Team Leader, Backend, Testing<br></br>UID: 19BCS1561</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src={Tushar} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Tushar Lohani</h5>
              <p className="card-text">Role: Backend, Testing<br></br>UID: 19BCS1559</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src={Mohit} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Mohit Raj</h5>
              <p className="card-text">Role: Product Design, Frontend<br></br>UID: 19BCS1558</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src={Gazal} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Gazal</h5>
              <p className="card-text">Role: Frontend, Documentation<br></br>UID: 19BCS1524</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        <footer className="footer mt-auto py-3 bg-dark" style={{height: '11.6rem'}}>
        <div className="container">
          <p className="text-white">Contact Us</p>
          <ul className="list text-white" style={{width: '50%'}}>
            <li className="list-item">Ankit Kumar : 19bcs1561@cuchd.in</li>
            <li className="list-item">Tushar Lohani : 19bcs1558@cuchd.in</li>
            <li className="list-item">Mohit Raj : 19bcs1559@cuchd.in</li>
            <li className="list-item">Gazal : 19bcs1524@cuchd.in</li>
          </ul>
          <img src={CU} align="right" alt="Chandigarh University" style={{marginTop: '-7rem'}} width="80px"/>
        </div>
      </footer>
        </>
    )
}

export default LandingPage