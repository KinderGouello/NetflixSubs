import React from 'react';
import { Select, Button } from 'semantic-ui-react';

class ChooseForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form className="ui form">
        <div className="field">
          <Select placeholder='Select your subtitles' options={[{key: '', value: ''}, { key: 'af', value: 'af', text: 'Afghanistan' }, ...{}]} />
        </div>
        <Button content='Choose' />
      </form>
    )
  }
}

export default ChooseForm;
