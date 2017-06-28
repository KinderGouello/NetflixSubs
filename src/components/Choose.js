import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'semantic-ui-react';

class ChooseForm extends Component {
  handleChange(event, data) {
    event.preventDefault();
    this.props.onChange({
      select: data.value,
    });
  }

  render() {
    const { options, placeholder, confirmText } = this.props;

    return (
      <form className="ui form">
        <div className="field">
          <Dropdown
            selection
            value={options.value}
            onChange={(event, data) => this.handleChange(event, data)}
            placeholder={placeholder}
            options={options}
          />
        </div>
        <Button content={confirmText} />
      </form>
    )
  }
}

ChooseForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  confirmText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default ChooseForm;
