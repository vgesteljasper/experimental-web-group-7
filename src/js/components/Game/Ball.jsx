import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import wait from './../../functions/wait.js';

class Ball extends Component {
  //
  constructor(props) {
    super(props);

    this.$node = null;
    this.props.gameStore
      .on('addCollisionDetection', this.addCollisionDetection)
      .on('removeCollisionDetection', this.removeCollisionDetection);
  }

  addCollisionDetection = () => {
    wait(500, () => this.$node.addEventListener('collide', this.props.gameStore.collisionHandler));
  };

  removeCollisionDetection = () => {
    this.$node.removeEventListener('collide', this.props.gameStore.collisionHandler);
  };

  render() {
    return this.props.gameStore.renderBall ? (
      <a-sphere
        id="bowlingBall"
        radius=".75"
        color="black"
        dynamic-body="shape: sphere; sphereRadius: .77; mass: 50;"
        velocity="0 0 -35"
        src={`#${this.props.gameStore.me.uri}`}
        position={`${this.props.gameStore.ballDirection} -1.25 -6`}
        ref={el => (this.$node = el)}
      />
    ) : null;
  }
}

Ball.propTypes = {
  gameStore: PropTypes.object.isRequired,
};

export default inject('gameStore')(observer(Ball));