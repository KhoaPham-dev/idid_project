import React, { Component } from 'react';
import {RenderRegistriedContests} from './RenderRegistriedContests'
export class RegistriedContests extends Component {
    render() {
        return (
           <RenderRegistriedContests    registriedContests={this.props.registriedContests}
                                        userJoinedContests={this.props.userJoinedContests}
                                        changeRegistriedContestsInfor={this.props.changeRegistriedContestsInfor}
                                        renderRegistriedContestInfor = {this.props.renderRegistriedContestInfor}
                                        removeContest = {this.props.removeContest}/>
        );
    }
}
