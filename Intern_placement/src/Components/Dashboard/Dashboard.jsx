import React, { useState } from 'react';
import coat1 from '../../assets/coat1.jpg';
import './Dashboard.css';
import axios from 'axios';
import {
  FaHome,
  FaUniversity,
  FaBuilding,
  FaDownload,
  FaSignOutAlt,
  FaBell,
  FaCog,
} from 'react-icons/fa';
import UploadWidget from '../Upload/UploadWidget';

const Dashboard = () => {
  // State variables for University form
  const [images, setImages] = useState('');
  const [university, setUniversity] = useState('');
  const [location, setLocation] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [kraPin, setkraPin] = useState('');
  const [contact, setContact] = useState('');

  // State variables for Company form
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyStatus, setCompanyStatus] = useState('');
  const [companyKraPin, setCompanyKraPin] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyImages, setCompanyImages] = useState('');

  const [showUniversityInputs, setShowUniversityInputs] = useState(false);
  const [showCompanyInputs, setShowCompanyInputs] = useState(false);
  const [headingText, setHeadingText] = useState('');

  // State for popup and admin form
  const [showPopup, setShowPopup] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const handleUniversityClick = () => {
    setShowUniversityInputs(true);
    setShowCompanyInputs(false);
    setHeadingText('Add University');
  };

  const handleCompanyClick = () => {
    setShowCompanyInputs(true);
    setShowUniversityInputs(false);
    setHeadingText('Add Company');
  };

  const handleSettingsClick = () => {
    setShowPopup(!showPopup);
  };

  const handleAddAdminClick = () => {
    setShowAdminForm(true);
  };

  const handleCloseAdminForm = () => {
    setShowAdminForm(false);
  };

  // Function to handle University form submission
  const handleUniversitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/University/details',
        {
          university,
          location,
          domain,
          email,
          address,
          status,
          kraPin,
          contact,
          images,
        }
      );

      if (response.status === 201) {
        alert('University details added successfully');
        setUniversity('');
        setLocation('');
        setDomain('');
        setEmail('');
        setAddress('');
        setStatus('');
        setkraPin('');
        setContact('');
        setImages('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle Company form submission
  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/Company/details',
        {
          companyName,
          companyLocation,
          companyDomain,
          companyEmail,
          companyAddress,
          companyStatus,
          companyKraPin,
          companyContact,
          companyImages,
        }
      );

      if (response.status === 201) {
        alert('Company details added successfully');
        setCompanyName('');
        setCompanyLocation('');
        setCompanyDomain('');
        setCompanyEmail('');
        setCompanyAddress('');
        setCompanyStatus('');
        setCompanyKraPin('');
        setCompanyContact('');
        setCompanyImages('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboardContainer">
      <div className="upBar">
        <p>
          Welcome <b>SuperAdmin</b>
        </p>
        <div className="icons">
          <FaBell />
          <FaCog onClick={handleSettingsClick} />
        </div>
        {showPopup && (
          <div className="settingsPopup">
            <ul>
              <li onClick={handleAddAdminClick}>Add Admin</li>
              <li>Manage Users</li>
              <li>Settings</li>
            </ul>
          </div>
        )}
      </div>

      {showAdminForm && (
        <>
          <div className="overlay" onClick={handleCloseAdminForm}></div>
          <div className="adminFormContainer">
            <form className="adminForm">
              <h3>Add Admin</h3>
              <label>Username:</label>
              <input type="text" />
              <label>Email:</label>
              <input type="email" />
              <label>Password:</label>
              <input type="password" />
              <div className="adminFormButtons">
                <button type="button" className="darkBrownButton">
                  Add
                </button>
                <button
                  type="button"
                  className="redButton"
                  onClick={handleCloseAdminForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <div className="sideBar">
        <img src={coat1} alt="Coat of Arms" />
        <ul className="sideList">
          <li>
            <FaHome /> Dashboard
          </li>
          <li onClick={handleUniversityClick}>
            <FaUniversity /> University
          </li>
          <li onClick={handleCompanyClick}>
            <FaBuilding /> Company
          </li>
          <li>
            <FaDownload /> Reports
          </li>
          <li>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
        <div className="logoutProfile">
          <ul>
            <li>Profile</li>
          </ul>
        </div>
      </div>
      <div className="mainContent">
        <div className="contentArea">
          <h3>{headingText}</h3>
          {showUniversityInputs && (
            <form className="formContainer" onSubmit={handleUniversitySubmit}>
              <label className="label1">University Name:</label>
              <input
                className="input1"
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <label className="label2">Location:</label>
              <input
                className="input2"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label className="label3">Domain:</label>
              <input
                className="input3"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <label className="label4">Email:</label>
              <input
                className="input4"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label5">Address:</label>
              <input
                className="input5"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="label6">Status:</label>
              <input
                className="input6"
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className="label7">KRA PIN:</label>
              <input
                className="input7"
                type="text"
                value={kraPin}
                onChange={(e) => setkraPin(e.target.value)}
              />
              <label className="label8">Contact:</label>
              <input
                className="input8"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <div className="uploadWidget">
                <UploadWidget
                  uwConfig={{
                    multiple: true,
                    cloudName: 'Mbita',
                    uploadPreset: 'jobImages',
                    folder: 'posts',
                  }}
                  setState={setImages}
                />
              </div>
              <div className="buttonRow">
                <button type="submit" className="darkBrownButton">
                  Submit
                </button>
                <button type="button" className="redButton">
                  Cancel
                </button>
              </div>
            </form>
          )}
          {showCompanyInputs && (
            <form className="formContainer" onSubmit={handleCompanySubmit}>
              <label className="label1">Company Name:</label>
              <input
                className="input1"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <label className="label2">Location:</label>
              <input
                className="input2"
                type="text"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
              />
              <label className="label3">Domain:</label>
              <input
                className="input3"
                type="text"
                value={companyDomain}
                onChange={(e) => setCompanyDomain(e.target.value)}
              />
              <label className="label4">Email:</label>
              <input
                className="input4"
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
              />
              <label className="label5">Address:</label>
              <input
                className="input5"
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
              <label className="label6">Status:</label>
              <input
                className="input6"
                type="text"
                value={companyStatus}
                onChange={(e) => setCompanyStatus(e.target.value)}
              />
              <label className="label7">KRA PIN:</label>
              <input
                className="input7"
                type="text"
                value={companyKraPin}
                onChange={(e) => setCompanyKraPin(e.target.value)}
              />
              <label className="label8">Contact:</label>
              <input
                className="input8"
                type="text"
                value={companyContact}
                onChange={(e) => setCompanyContact(e.target.value)}
              />
              <div className="uploadWidget">
                <UploadWidget
                  uwConfig={{
                    multiple: true,
                    cloudName: 'Mbita',
                    uploadPreset: 'jobImages',
                    folder: 'posts',
                  }}
                  setState={setCompanyImages}
                />
              </div>
              <div className="buttonRow">
                <button type="submit" className="darkBrownButton">
                  Submit
                </button>
                <button type="button" className="redButton">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
