import React from 'react';
import { Button } from 'semantic-ui-react';

const DownloadButton = () => (
  <div style={{textAlign: 'center'}}>
    <Button content='Download subtitles' icon='download' labelPosition='left' color='green' />
  </div>
);

export default DownloadButton;
