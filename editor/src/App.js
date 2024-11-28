import React, {Component} from 'react';
import PlotlyEditor from 'react-chart-editor';
import plotly from 'plotly.js/dist/plotly';
import 'react-chart-editor/lib/react-chart-editor.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      layout: {},
      config: {},
      dataSources: {},
      dataSourceOptions: {}
    };
  }


  UNSAFE_componentWillMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const plotURL = searchParams.get('plotURL');
    const plotDS = searchParams.get('plotDS');

    if (!plotURL) {
      return; // TODO: maybe alert with an informative message?
    }    

    if (!plotDS) {
      return; // TODO: maybe alert with an informative message?
    }    

    fetch(plotURL)
      .then(response => response.json())
      .then(fig => { 
        this.setState({data: fig.data, layout: fig.layout, config: fig.config});
      });

    fetch(plotDS)
      .then(response => response.json())
      .then(fig => { 
        this.setState({dataSources: fig.data});
      });

    const dataSourceOptions = Object.keys(this.state.dataSources).map((name) => ({
      value: name,
      label: name,
    }));
    this.setState({dataSourceOptions: [{value: "expression", label: "expression"},]});//dataSourceOptions});
  }

  render() {
    console.log(this.state.data);
    console.log(this.state.dataSources);
    console.log(this.state.dataSourceOptions);
    return (
      <div className="app">
        <PlotlyEditor
          data={this.state.data}
          layout={this.state.layout}
          config={this.state.config}
          dataSources={this.state.dataSources}
          dataSourceOptions = {this.state.dataSourceOptions}
          plotly={plotly}
          onUpdate={(data, layout, frames) => this.setState({data, layout, frames})}
          useResizeHandler
          debug
          advancedTraceTypeSelector
        />
      </div>
    );
  }
}

export default App;
