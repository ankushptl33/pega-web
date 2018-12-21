import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
//import mockdata from '../../json/AmchartData.json';
//import apiData from '../../json/ApiData.json';
import { connect } from 'react-redux';

// var env = process.env.NODE_ENV || 'dev';
// const envVar = require('../../uiconfig/config.' + env);

//const ProviderCountAPI = envVar.uri + envVar.port + envVar.registry + envVar.project + apiData.apis.getGraphCount;
//const ProviderCountAPI = 'http://127.0.0.1:9001/registry/pegasus/provider/graphCount';
// const datatest = {
//     year: '2017'
// }
// const InitParamProv = {
//         method:'POST',
//         headers : {'Content-Type': 'application/json'},
//         body: JSON.stringify(datatest)

//      };

// const InitParamProvRxjs = {
//   year: '2017'
// };
class AmSerialAreaChartWithDwnld extends React.Component {
  // constructor(props) {
  //   super(props);

  //   const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
  //   this.state = {

  //     windowWidth: initialWidth - 100,
  //     componentWidth: 300,
  //     providerArray: [],
  //     messages: []
  //   };
  // }

  // getFromProviderApiPromise() {
  //   fetch(ProviderCountAPI, InitParamProv).
  //     then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({ providerArray: responseJson.result });
  //       // console.log(('Promise Call:', this.state.providerArray);
  //     });
  // }

  //  getFromProviderApiRedu() {
  //   const fetchData = Rx.Observable
  //     .ajax
  //     .post(ProviderCountAPI, InitParamProvRxjs)
  //     .scan((messages, message) => [message].concat(messages), [])
  //     .subscribe(data => {
  //       //// console.log((data[0].response.result);
  //       this.setState({ messages: data[0].response.result })
  //     }
  //     );
  //   return fetchData;
  // }

  /**
   *
   * Rxjs with POST
   * @returns
   * @memberof AmSerialAreaChart
   */
  // getFromProviderApiRxjs() {
  //   const fetchData = Rx.Observable
  //     .ajax
  //     .post(ProviderCountAPI, InitParamProvRxjs)
  //     .scan((messages, message) => [message].concat(messages), [])
  //     .subscribe(data => {
  //       //// console.log((data[0].response.result);
  //       this.setState({ messages: data[0].response.result })
  //     }
  //     );
  //   return fetchData;
  // }

  //componentDidMount() {
  //this.getFromProviderApiPromise();
  //this.getFromProviderApiRedu();
  //this.getFromProviderApiRxjs();
  //}

  render() {
    //// console.log((this.props.providerReducer.providerData.result);
    //// console.log((this.props);
    //const {tweets,this.props.providerReducer.providerData.result } = this.props;
    //// console.log(("from amchart", this.props.providerReducer.providerData);
    //// console.log(("from 2 amchart",  this.state.messages);

    //var config = ;
    return (
      <div className="areaChartAreawithdownload">
        {this.props.providerReducer.providerData.result ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              hideCredits: true,
              type: 'serial',
              theme: 'light',
              marginRight: 80,
              dataProvider: this.props.providerReducer.providerData.result,
              valueAxes: [
                {
                  position: 'left',
                  title: 'Provider Count',
                },
              ],
              graphs: [
                {
                  id: 'g1',
                  fillAlphas: 0.4,
                  valueField: 'Active',
                  balloonText:
                    "<div style='margin:2px; font-size:10px;'>Active:<b>[[value]]</b></div>",
                },
                {
                  id: 'g2',
                  lineColor: '#800080',
                  fillAlphas: 0.4,
                  valueField: 'Inactive',
                  balloonText:
                    "<div style='margin:2px; font-size:10px;'>Inactive:<b>[[value]]</b></div>",
                },
              ],
              chartScrollbar: {
                graph: 'g1',
                scrollbarHeight: 40,
                backgroundAlpha: 0,
                selectedBackgroundAlpha: 0.1,
                selectedBackgroundColor: '#888888',
                graphFillAlpha: 0,
                graphLineAlpha: 0.5,
                selectedGraphFillAlpha: 0,
                selectedGraphLineAlpha: 1,
                autoGridCount: true,
                color: '#AAAAAA',
              },
              chartCursor: {
                categoryBalloonDateFormat: 'JJ:NN, DD MMMM',
                cursorPosition: 'mouse',
              },
              categoryField: 'Date',
              categoryAxis: {
                minPeriod: 'mm',
                parseDates: true,
              },
              legend: {
                data: [
                  {
                    title: 'Active',
                    color: 'rgb(114,188,247)',
                  },
                  {
                    title: 'InActive',
                    color: '#800080',
                  },
                ],
                position: 'top',
              },
              export: {
                enabled: true,
                dateFormat: 'YYYY-MM-DD HH:NN:SS',
              },
            }}
          />
        ) : (
          <div>
            <div className="ui active inverted dimmer">
              <div className="ui medium text loader">Loading</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const DefaultApp = connect(mapStateToProps)(AmSerialAreaChartWithDwnld);
export default DefaultApp;
