import React, { useState } from 'react';
import QrReader from 'react-qr-reader';


export const Scanner = () => {
    const [token, setToken] = useState();
    
    const handleScan = data => {
      if (data) {
        setToken(data);
        console.log(token);
      }
    }

    const handleError = err => {
      console.error(err);
    }
    
    return (
    <div>
        <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
        />
    </div>
    )
  }