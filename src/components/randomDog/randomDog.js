import React, { Component } from "react";
import PropTypes from "prop-types";
import "./randomDog.css";

import { motion } from "framer-motion";

const buttonVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { delay: 1.5 } },
  hovered: { backgroundColor: "rgb(77, 184, 255)", scale: 1.2 },
  pressed: { scale: 0.9 }
};

class RandomDog extends Component {
  static propTypes = {
    dogUrl: PropTypes.string,
    fetchDog: PropTypes.func
  };

  static defaultProps = {
    dogUrl: "",
    fetchDog: f => f
  };

  render() {
    return (
      <div className="random-dog-container" data-testid="randomdog-container">
        <motion.button
          className="dog-button"
          data-testid="dog-button"
          onClick={() => this.props.fetchDog()}
          initial="hidden"
          animate="visible"
          whileHover="hovered"
          whileTap="pressed"
          variants={buttonVariant}
        >
          GET ME A DOG
        </motion.button>
        {this.renderDogSection()}
      </div>
    );
  }

  renderDogSection() {
    if (this.props.dogUrl) {
      return (
        <img
          className="dog-image"
          data-testid="dog-img"
          src={this.props.dogUrl}
          alt="doggo"
        />
      );
    }
    return (
      <div className="dog-placeholder" data-testid="dog-placeholder">
        No dog loaded yet. Get some!
      </div>
    );
  }
}

export default RandomDog;
