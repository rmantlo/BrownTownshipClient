import React from 'react';
import './footer.css';

export default class Footer extends React.Component {
    
    render() {
        return (
            <div>
                <div className='myFooter'>
                    <p>&copy; Mantlo {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        )
    }
}