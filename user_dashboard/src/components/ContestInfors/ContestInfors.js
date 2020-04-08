import React, { Component } from 'react';
import {RenderContestInfors} from './RenderContestInfors';
export class ContestInfors extends Component {
    render() {
        return (
            <RenderContestInfors contests={this.props.contests} 
                                userId={this.props.userId}
                                registryContest={this.props.registryContest}
                                />
        );
    }
}