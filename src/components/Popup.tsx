import React from 'react';
import './Popup.css';

interface PopupProps {
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                {children}
                
            </div>
        </div>
    );
};

export default Popup;
