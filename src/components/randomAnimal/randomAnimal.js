import React from "react";

import PropTypes from "prop-types";
import "./randomAnimal.css";

import { motion } from "framer-motion";

const buttonVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { delay: 1.5 } },
  hovered: { backgroundColor: "rgb(255, 176, 189)", scale: 1.2 },
  pressed: { scale: 0.9 }
};

const RandomAnimal = ({ animalUrl = "", fetchAnimal = f => f }) => {
  return (
    <div
      className="random-animal-container"
      data-testid="randomanimal-container"
    >
      <motion.button
        className="animal-button"
        onClick={() => fetchAnimal()}
        initial="hidden"
        animate="visible"
        variants={buttonVariant}
        whileHover="hovered"
        whileTap="pressed"
        data-testid="animal-button"
      >
        GET ME A CAT
      </motion.button>
      {animalUrl ? (
        <img
          className="animal-image"
          src={animalUrl}
          alt="animaly"
          data-testid="animal-img"
        />
      ) : (
        <div className="animal-placeholder" data-testid="animal-placeholder">
          No Animal loaded yet. Come get me!
        </div>
      )}
    </div>
  );
};

RandomAnimal.propTypes = {
  animalUrl: PropTypes.string,
  fetchAnimal: PropTypes.func
};

export default RandomAnimal;
