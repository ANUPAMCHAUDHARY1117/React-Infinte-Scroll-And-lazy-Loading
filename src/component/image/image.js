import React from 'react';

const ImageComponent = ({ src }) => {
	return <img src={src} alt='Avatar' style={{ width: '50%' }} />;
};

export default ImageComponent;
