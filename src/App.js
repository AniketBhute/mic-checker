import React from 'react';
import logo from './logo.svg';
import './App.css';
import AudioAnalyser from './components/AudioAnalyser';
import ParticlesBg from "particles-bg";
import Particles from 'react-particles-js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };

    this.toggleMicrophone = this.toggleMicrophone.bind(this);

  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {

    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#31495B" bg={true} />
        
        <div className="controls">
          <button className="micButton" onClick={this.toggleMicrophone}  >
          {/* {this.state.audio ? 'Stop microphone' : 'Get microphone input'} */}
          <img src={this.state.audio ? 'https://img.icons8.com/officel/80/000000/shutdown.png':'https://img.icons8.com/ultraviolet/80/000000/shutdown.png' } />
          </button>
        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );


  }
}

export default App;
