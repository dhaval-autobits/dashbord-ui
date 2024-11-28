import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilInfo } from '@coreui/icons';

// Import flag images
import blueFlag from '../../assets/images/flags/blue.jpg';
import redFlag from '../../assets/images/flags/red.jpg';
import yellowFlag from '../../assets/images/flags/yellow.jpg';

const Dashboard = () => {
  const [alertData, setAlertData] = useState([]); // State for storing API data
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true); // Loading state
  const [filter, setFilter] = useState(''); // Filter state
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); // Sorting state
  // const [detailsVisibility, setDetailsVisibility] = useState({}); // State for storing the visibility of details for each row
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedAlert, setSelectedAlert] = useState(null); // State to store selected alert for modal
  const [hoverIndex, setHoverIndex] = useState(null);


  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.162:5000/display_data');
        setAlertData(response.data); // Set fetched data to state
        setFilteredData(response.data); // Initially show all data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchData();
  }, []);

  // Filter the data
  useEffect(() => {
    const filtered = alertData.filter((alert) =>
      Object.values(alert).some((value) =>
        value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [filter, alertData]);

  // Sort the data
  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };

  // Function to render flag as an image
  const renderFlag = (flag) => {
    switch (flag.toLowerCase()) {
      case 'blue':
        return <img src={blueFlag} alt="Blue Flag" style={{ width: '24px', height: '18px', borderRadius: '2px' }} />;
      case 'red':
        return <img src={redFlag} alt="Red Flag" style={{ width: '24px', height: '18px', borderRadius: '2px' }} />;
      case 'yellow':
        return <img src={yellowFlag} alt="Yellow Flag" style={{ width: '24px', height: '18px', borderRadius: '2px' }} />;
      default:
        return null; // Default case if flag is not recognized
    }
  };

  // Handle clicking the info button to show the modal
  const handleInfoClick = (alert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedAlert(null);
  };

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <span>Triggered Alerts Logs</span>
              <div>
                <CFormInput
                  placeholder="Filter alerts..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="me-2"
                  style={{ width: '200px', display: 'inline-block' }}
                />
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <p>Loading...</p> // Show loading message while data is being fetched
            ) : (
              <>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead className="text-nowrap">
                    <CTableRow>
                      <CTableHeaderCell
                        className="bg-body-tertiary text-center"
                        onClick={() => sortData('Date')}
                      >
                        Date {sortConfig.key === 'Date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </CTableHeaderCell>
                      <CTableHeaderCell
                        className="bg-body-tertiary text-center"
                        onClick={() => sortData('Time')}
                      >
                        Time {sortConfig.key === 'Time' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Flag</CTableHeaderCell>
                      <CTableHeaderCell
                        className="bg-body-tertiary"
                        onClick={() => sortData('Alert Name')}
                      >
                        Alert Name {sortConfig.key === 'Alert Name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </CTableHeaderCell>
                      <CTableHeaderCell
                        className="bg-body-tertiary "
                        onClick={() => sortData('Value')}
                      >
                        Value {sortConfig.key === 'Value' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </CTableHeaderCell>
                      <CTableHeaderCell
                        className="bg-body-tertiary"
                      >
                        Details
                      </CTableHeaderCell>
                      {/* <CTableHeaderCell
                        className="bg-body-tertiary text-center"
                        onClick={() => sortData('Machine Id')}
                      >
                        Machine ID {sortConfig.key === 'Machine Id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </CTableHeaderCell>
                      <CTableHeaderCell
                        className="bg-body-tertiary text-center"
                        onClick={() => sortData('Alert ID')}
                      >
                        Alert ID {sortConfig.key === 'Alert ID' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </CTableHeaderCell> */}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredData.map((alert, index) => {
                      // Split the "Date & Time" field into separate Date and Time
                      const [date, time] = alert['Date & Time'].split(' ');

                      return (
                         <CTableRow
                          key={index}
                         
                        >
                          <CTableDataCell className="text-center">{date}</CTableDataCell>
                          <CTableDataCell className="text-center">{time}</CTableDataCell>
                          <CTableDataCell>{renderFlag(alert['Flag'])}</CTableDataCell>
                          <CTableDataCell>{alert['Alert Name']}</CTableDataCell>
                          <CTableDataCell>
                            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                              {alert['Value']
                                .split(',')
                                .map((pair) => pair.trim())
                                .join('\n')}
                            </pre>
                          </CTableDataCell>
                          {/* <CTableDataCell className="text-center">{alert['Machine Id']}</CTableDataCell>
                          <CTableDataCell className="text-center">{alert['Alert ID']}</CTableDataCell> */}
                          {/* Info Icon Button */}
                          <CTableDataCell>
                            <CButton
                              color="link"
                              onClick={() => handleInfoClick(alert)}
                              style={{ padding: '0', margin: '0', fontSize: '20px' }}
                              onMouseEnter={() => setHoverIndex(index)} // Set hover index
                              onMouseLeave={() => setHoverIndex(null)} // Clear hover index
                            >
                              <CIcon icon={cilInfo} />
                            </CButton>
                          </CTableDataCell>
                          {/* Display hover details */}
                          {hoverIndex === index && (
                            <div
                              style={{
                                position: 'absolute',
                              
                                padding: '15px', // More padding to make it spacious like the modal
                                borderRadius: '8px', // Rounded corners for better design
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                                zIndex: 1000, // Ensure it's displayed above the table
                                width: '350px', // Adjust width for better view
                                right: 0, // Position horizontally at center
                                transform: 'translateX(-50%)', // Center it properly
                              }}
                            >
                              <div>
                                <strong>Alert Name:</strong> {alert['Alert Name']}
                              </div>
                              <div>
                                <strong>Machine ID:</strong> {alert['Machine Id']}
                              </div>
                              <div>
                                <strong>Alert ID:</strong> {alert['Alert ID']}
                              </div>
                              <div>
                                <strong>Value:</strong>{' '}
                                {alert['Value']
                                  .split(',')
                                  .map((pair) => pair.trim())
                                  .join('\n')}
                              </div>
                            </div>
                          )}
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal for displaying detailed alert information */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader>
          <CModalTitle>Alert Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedAlert && (
            <>
              <p><strong>Alert Name:</strong> {selectedAlert['Alert Name']}</p>
              <p><strong>Machine ID:</strong> {selectedAlert['Machine Id']}</p>
              <p><strong>Alert ID:</strong> {selectedAlert['Alert ID']}</p>
              <p><strong>Value:</strong> {selectedAlert['Value']}</p>
              <p><strong>Flag:</strong> {selectedAlert['Flag']}</p>
              <p><strong>Date & Time:</strong> {selectedAlert['Date & Time']}</p>
              {/* Add more details as necessary */}
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default Dashboard;
