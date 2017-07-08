import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const DownloadButton = ({ content, onClick }) => (
  <div style={{textAlign: 'center'}}>
    <Button content={content} onClick={onClick} icon='download' labelPosition='left' color='green' />
  </div>
);

DownloadButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DownloadButton;
