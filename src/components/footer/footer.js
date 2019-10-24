import React from 'react';
import './footer.css';

export default class Footer extends React.Component {
    
    render() {
        return (
            <div>
                <div className='myFooter'>
                    <p>&copy; Rebekah Anna Designs {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        )
    }
}