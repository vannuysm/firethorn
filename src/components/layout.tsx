import React from 'react';
import 'semantic-ui-css/semantic.min.css';

export default class LayoutComponent extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
