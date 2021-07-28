import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import AppNavigation from './appnavigation';
class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    console.log(color.rgb);
  };

  render() {


    const styles = reactCSS({
      'default': {
        color: {
          width: '210px',
          height: '16px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        outerdiv: {
          margin:"50px",
        },
      },
    });

    return (
      <React.Fragment>
        <AppNavigation />
          <div style={ styles.outerdiv }>
            <div style={ styles.swatch } onClick={ this.handleClick }>
              <div style={ styles.color } />
            </div>
            { this.state.displayColorPicker ? <div style={ styles.popover }>
              <div style={ styles.cover } onClick={ this.handleClose }/>
              <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
            </div> : null }

          </div>
        </React.Fragment>
    )
  }
}

export default SketchExample