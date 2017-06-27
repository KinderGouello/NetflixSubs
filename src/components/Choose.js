import React from 'react';
import { Select, Button } from 'semantic-ui-react';

class ChooseForm extends React.Component {
  constructor() {
    super();
    this.state = { subtitles: '' };
    this.options = [{key: '', value: ''}, { key: 'af', value: 'af', text: 'Afghanistan' }, ...{}];
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  submit(event) {
    event.preventDefault();
  }

  handleSelectChange(event, data) {
    this.setState({ subtitles: data.value });
  }

  render() {
    return (
      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <Select onChange={onChange} placeholder='Select your subtitles' options={this.options} />
        </div>
        <Button content='Choose' />
      </form>
    )
  }
}

export default ChooseForm;
