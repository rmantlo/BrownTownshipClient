import React from 'react';


export default class PDFViewer extends React.Component {
    constructor(props) {
        super(props);
        this.viewerRef = React.createRef();
    }

    componentDidMount() {
        
    }


    render() {
        return (
            <div>
                {(this.props.data) ?
                    <object className='iframe' data={this.props.data} >
                        {/* <iframe className='iframe' src={this.props.data} title="ahhh" /> */}
                        <p>Oops! You don't support PDFs!</p>
                        <p><a href={this.props.data} download>Download Instead</a></p>
                    </object> : <p>No attached document!</p>
                }
            </div>
        )
    }
}