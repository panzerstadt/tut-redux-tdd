import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import fetchDog from "../../actions/fetchDog/fetchDog";
import RandomDog from "../randomDog/randomDog";
import fetchAnimal from "../../actions/fetchAnimal/fetchAnimal";
import RandomAnimal from "../randomAnimal/randomAnimal";
import "./dogApp.css";

import { motion } from "framer-motion";

const parent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.4
    }
  }
};

const children = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 }
};

export class DogApp extends Component {
  static propTypes = {
    dogUrl: PropTypes.string,
    foxUrl: PropTypes.string,
    fetchDog: PropTypes.func,
    fetchAnimal: PropTypes.func
  };

  render() {
    return (
      <motion.div
        data-testid="app-container"
        className="app-container"
        initial="hidden"
        animate="visible"
        variants={parent}
      >
        <motion.div key="dog" variants={children}>
          <RandomDog
            fetchDog={this.props.fetchDog}
            dogUrl={this.props.dogUrl}
          />
        </motion.div>

        <br />

        <motion.div key="animal" variants={children}>
          <RandomAnimal
            fetchAnimal={this.props.fetchAnimal}
            animalUrl={this.props.animalUrl}
          />
        </motion.div>
      </motion.div>
    );
  }
}

const mapProps = state => {
  return {
    dogUrl: state.dog.url,
    animalUrl: state.animal.url
  };
};

const mapDispatch = {
  fetchDog,
  fetchAnimal
};

export default connect(
  mapProps,
  mapDispatch
)(DogApp);
