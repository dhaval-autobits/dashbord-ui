import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://autobitslabs.com" target="_blank" rel="noopener noreferrer">
        Autobits
        </a>
        <span className="ms-1">&copy; 2024 Autobits LTD.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://autobitslabs.com/" target="_blank" rel="noopener noreferrer">
          Autobits &amp; Devlopment Team
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
