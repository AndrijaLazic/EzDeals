import React from 'react';
import PropTypes from 'prop-types';
import classes from "./Product.module.css";

function Product(props) {
	return (
		<div className={classes.mainContainer}>
			<p>Proizvod</p>
		</div>
	);
}

Product.propTypes = {};

export default Product;
