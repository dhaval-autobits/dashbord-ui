import React, { useState } from 'react';
import axios from 'axios';

import Select from 'react-select';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CFormLabel,
  CAlert,
} from '@coreui/react';

const CreateAlert = () => {
  const [formData, setFormData] = useState({
    alertName: '',
    machineId: '',
    alertValue: '',
    flag: 'red',
    periodic: 'true',
    alert_frequency: '',
    logic_language: '',
    library_required: '',
    git_link: '',
    git_pull_date: '',
    permissions: '',
    variablePairs: [{ variableName: '', selectedValue: '' }],
    telegram_channels: [],
    whatsapp_numbers: [],
    sms_numbers: [],
    api_list: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const whatsappsNumbers = [
    { value: '9898989898', label: '9898989898' },
    { value: '9827384939', label: '9827384939' },
    { value: '9973793937', label: '9973793937' },
  ];

  const telegramOptions = [
    { value: '7990074653', label: 'Autobits(7990074653)' },
    { value: '1002389770231', label: 'Channel 2(1002389770231)' },
    { value: '1002389770232', label: 'Channel 3(1002389770232)' },
  ];

  const smsOptions = [
    { value: '9912345678', label: '9912345678' },
    { value: '9923456789', label: '9923456789' },
    { value: '9934567890', label: '9934567890' },
  ];

  const apiListOptions = [
    { value: 'api1', label: 'API 1' },
    { value: 'api2', label: 'API 2' },
    { value: 'api3', label: 'API 3' },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVariableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariablePairs = [...formData.variablePairs];
    updatedVariablePairs[index] = {
      ...updatedVariablePairs[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      variablePairs: updatedVariablePairs,
    });
  };

  const addVariablePair = () => {
    setFormData({
      ...formData,
      variablePairs: [
        ...formData.variablePairs,
        { variableName: '', selectedValue: '' },
      ],
    });
  };

  const removeVariablePair = (index) => {
    const updatedVariablePairs = formData.variablePairs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      variablePairs: updatedVariablePairs,
    });
  };

  const handleTelegramChannelChange = (selectedOptions) => {
    setFormData({
      ...formData,
      telegram_channels: selectedOptions.map(option => option.value),
    });
  };

  const handlewhatsappsNumbersChange = (selectedOptions) => {
    setFormData({
      ...formData,
      whatsapp_numbers: selectedOptions.map(option => option.value),
    });
  };

  const handleSMSNumbersChange = (selectedOptions) => {
    setFormData({
      ...formData,
      sms_numbers: selectedOptions.map(option => option.value),
    });
  };

  const handleAPIListChange = (selectedOptions) => {
    setFormData({
      ...formData,
      api_list: selectedOptions.map(option => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Transform variablePairs into the desired structure
    const tag_id = formData.variablePairs.reduce((acc, pair) => {
      if (pair.variableName && pair.selectedValue) {
        acc[pair.variableName] = pair.selectedValue;
      }
      return acc;
    }, {});
  
    // Prepare final data
    const dataToSend = {
      ...formData,
      tag_id, // Add the transformed tag_id object
    };
  
    try {
      const response = await axios.post(
        'http://192.168.1.162:5000/submit_alert',
        dataToSend
      );
      if (response.status === 200) {
        setSuccessMessage('Alert created successfully!');
        setFormData({
          alertName: '',
          machineId: '',
          deviceId: '',
          alertValue: '',
          flag: 'red',
          periodic: 'true',
          alert_frequency: '',
          logic_language: '',
          library_required: '',
          git_link: '',
          git_pull_date: '',
          permissions: '',
          variablePairs: [{ variableName: '', selectedValue: '' }],
          telegram_channels: [],
          whatsapp_numbers: [],
          sms_numbers: [],
          api_list: [],
        });
      }
    } catch (error) {
      setErrorMessage('Failed to create alert. Please try again.');
    }
  };
  

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#212631',  // Matching background with other inputs
      borderColor: '#2d3543',  // Border similar to CoreUI form elements
      borderRadius: '0.375rem', // Rounded corners for consistency
      padding: '0.375rem 0.75rem', // Padding to match form inputs
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.375rem', // Rounded menu corners
      marginTop: '0.125rem',
    }),
    option: (provided) => ({
      ...provided,
      padding: '0.5rem',
      backgroundColor: '#212631',  // Adjust padding for better visual alignment
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e9ecef', // Match background color for selected values
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#212631', // Text color for multi-value label
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#dc3545',  // Remove button color (red)
      cursor: 'pointer',
    }),
  };

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Create Alert</h5>
          </CCardHeader>
          <CCardBody>
            {successMessage && <CAlert color="success">{successMessage}</CAlert>}
            {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              {/* Alert Name */}
              <div className="mb-3">
                <CFormLabel htmlFor="alertName">Alert Name</CFormLabel>
                <CFormInput
                  id="alertName"
                  name="alertName"
                  value={formData.alertName}
                  onChange={handleChange}
                  placeholder="Enter alert name"
                  required
                />
              </div>

              {/* Machine ID */}
              <div className="mb-3">
                <CFormLabel htmlFor="machineId">Machine ID</CFormLabel>
                <CFormInput
                  id="machineId"
                  name="machineId"
                  value={formData.machineId}
                  onChange={handleChange}
                  placeholder="Enter machine ID"
                  required
                />
              </div>

              {/* Device ID */}
              <div className="mb-3">
                <CFormLabel htmlFor="deviceId">Device ID</CFormLabel>
                <CFormInput
                  id="deviceId"
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleChange}
                  placeholder="Enter device ID"
                  required
                />
              </div>

              {/* Alert Value */}
              <div className="mb-3">
                <CFormLabel htmlFor="alertValue">Alert Value</CFormLabel>
                <CFormInput
                  id="alertValue"
                  name="alertValue"
                  value={formData.alertValue}
                  onChange={handleChange}
                  placeholder="Enter alert value"
                  
                />
              </div>

              {/* Flag */}
              <div className="mb-3">
                <CFormLabel htmlFor="flag">Flag</CFormLabel>
                <CFormSelect
                  id="flag"
                  name="flag"
                  value={formData.flag}
                  onChange={handleChange}
                  required
                >
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="yellow">Yellow</option>
                </CFormSelect>
              </div>

              {/* Periodic */}
              <div className="mb-3">
                <CFormLabel htmlFor="periodic">Periodic</CFormLabel>
                <CFormSelect
                  id="periodic"
                  name="periodic"
                  value={formData.periodic}
                  onChange={handleChange}
                  required
                >
                  <option value="true">True</option>
                  <option value="flase">False</option>
                </CFormSelect>
              </div>


              {/* Alert frequency */}
              <div className="mb-3">
                <CFormLabel htmlFor="alert_frequency">Alert frequency</CFormLabel>
                <CFormInput
                  id="alert_frequency"
                  name="alert_frequency"
                  value={formData.alert_frequency}
                  onChange={handleChange}
                  placeholder="Enter Alert frequency"
                  
                />
              </div>

              {/* Logic Language */}
              <div className="mb-3">
                <CFormLabel htmlFor="logic_language">Logic Language</CFormLabel>
                <CFormInput
                  id="logic_language"
                  name="logic_language"
                  value={formData.logic_language}
                  onChange={handleChange}
                  placeholder="Enter Logic Language"
                  
                />
              </div>

              {/* Library Required */}
              <div className="mb-3">
                <CFormLabel htmlFor="library_required">Library Required</CFormLabel>
                <CFormInput
                  id="library_required"
                  name="library_required"
                  value={formData.library_required}
                  onChange={handleChange}
                  placeholder="Enter Library Required"
                  
                />
              </div>

              {/* Git Link */}
              <div className="mb-3">
                <CFormLabel htmlFor="git_link">Git Link</CFormLabel>
                <CFormInput
                  id="git_link"
                  name="git_link"
                  value={formData.git_link}
                  onChange={handleChange}
                  placeholder="Enter Git Link"
                  
                />
              </div>

              {/* Git Pull Date */}
              <div className="mb-3">
                <CFormLabel htmlFor="git_pull_date">Git Pull Date</CFormLabel>
                <CFormInput
                  id="git_pull_date"
                  name="git_pull_date"
                  value={formData.git_pull_date}
                  onChange={handleChange}
                  placeholder="Enter Git Pull Date (YYYY-MM-DD)"
                  type="date"
                  
                />
              </div>

              {/* Permissions */}
              <div className="mb-3">
                <CFormLabel htmlFor="permissions">Permissions</CFormLabel>
                <CFormInput
                  id="permissions"
                  name="permissions"
                  value={formData.permissions}
                  onChange={handleChange}
                  placeholder="Enter Permissions"
                  
                />
              </div>




              {/* Variable Pairs */}
              <div id="variablePairContainer">
                {formData.variablePairs.map((pair, index) => (
                  <div className="row align-items-end variable-pair" key={index}>
                    <div className="col-md-4 mb-3">
                      <CFormLabel htmlFor={`variableName${index}`}>Enter Variable Name</CFormLabel>
                      <CFormInput
                        id={`variableName${index}`}
                        name="variableName"
                        value={pair.variableName}
                        onChange={(e) => handleVariableChange(index, e)}
                        placeholder="Enter variable name"
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <CFormLabel htmlFor={`valueSelection${index}`}>Select a Value</CFormLabel>
                      <CFormSelect
                        id={`valueSelection${index}`}
                        name="selectedValue"
                        value={pair.selectedValue}
                        onChange={(e) => handleVariableChange(index, e)}
                      >
                        <option value="286Cme">2_min-(286Cme)</option>
                        <option value="286Cyg">Machine ON-(286Cyg)</option>
                        <option value="286Cu9">Counter_2_min-(286Cu9)</option>
                        <option value="286CWR">Spare 3-(286CWR)</option>
                        <option value="286CEz">Spare 2-(286CEz)</option>
                        <option value="286CrL">Spare 1-(286CrL)</option>
                        <option value="286CTY">Move-(286CTY)</option>
                        <option value="286CMl">Rejection Count-(286CMl)</option>
                        <option value="286CVs">Velocity-(286CVs)</option>
                        <option value="286Csh">Position-(286Csh)</option>
                        <option value="286C5q">Production Count-(286C5q)</option>
                        <option value="286Chz">Auto Mode-(286Chz)</option>
                        <option value="286Cvw">Emergency-(286Cvw)</option>
                        <option value="286C9h">Production Cycle-(286C9h)</option>
                      </CFormSelect>
                    </div>

                    <div className="col-md-1 mb-3">
                      <CButton
                        type="button"
                        color="danger"
                        onClick={() => removeVariablePair(index)}
                      >
                        <i>Remove</i>
                      </CButton>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-4 mb-3">
                <CButton type="button" color="secondary" onClick={addVariablePair}>
                  Add Tag
                </CButton>
              </div>

              {/* Telegram Channels Multi-Select Dropdown */}
              <div className="mb-3">
                <CFormLabel htmlFor="telegram_channels">Telegram Channels</CFormLabel>
                <Select
                  id="telegram_channels"
                  options={telegramOptions}
                  isMulti
                  onChange={handleTelegramChannelChange}
                  value={telegramOptions.filter(option =>
                    formData.telegram_channels.includes(option.value)
                  )}
                  styles={customSelectStyles} // Apply custom styles
                  placeholder="Select Telegram Channels"
                />
              </div>

              {/* WhatsApp Number Multi-Select Dropdown */}
              <div className="mb-3">
                <CFormLabel htmlFor="whatsapp_numbers">WhatsApp Number</CFormLabel>
                <Select
                  id="whatsapp_numbers"
                  options={whatsappsNumbers}
                  isMulti
                  onChange={handlewhatsappsNumbersChange}
                  value={whatsappsNumbers.filter(option =>
                    formData.whatsapp_numbers.includes(option.value)
                  )}
                  styles={customSelectStyles} // Apply custom styles
                  placeholder="Select Telegram Channels"
                />
              </div>

              {/* SMS Number Multi-Select Dropdown */}
              <div className="mb-3">
                <CFormLabel htmlFor="sms_numbers">SMS Numbers</CFormLabel>
                <Select
                  id="sms_numbers"
                  options={smsOptions}
                  isMulti
                  onChange={handleSMSNumbersChange}
                  value={smsOptions.filter(option =>
                    formData.sms_numbers.includes(option.value)
                  )}
                  styles={customSelectStyles}
                  placeholder="Select SMS Numbers"
                />
              </div>

              {/* API List Multi-Select Dropdown */}
              <div className="mb-3">
                <CFormLabel htmlFor="api_list">API List</CFormLabel>
                <Select
                  id="api_list"
                  options={apiListOptions}
                  isMulti
                  onChange={handleAPIListChange}
                  value={apiListOptions.filter(option =>
                    formData.api_list.includes(option.value)
                  )}
                  styles={customSelectStyles}
                  placeholder="Select API List"
                />
              </div>

              

              {/* Submit Button */}
              <div className="d-flex justify-content-center mt-3">
                <CButton type="submit" color="primary">
                  Submit
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CreateAlert;
