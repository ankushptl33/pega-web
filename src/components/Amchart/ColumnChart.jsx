import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';
import { getLabelOfObject } from '../../utils/utils';
/*
Type of the graph. Possible values are: "line", "column", "step", "smoothedLine", "candlestick", "ohlc". XY and Radar charts can only display "line" type graphs.
Here we have used : type : column
*/
export default class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      graphData: props.genericData,
      level0: props.genericData,
      levelCount: 0,
    };
  }
  componentDidMount() {
    window.drillBack = this.drillBack.bind(this);
  }
  drillDownFunction(event) {
    var count = this.state.levelCount;
    this.state.event = event;
    if ('object' === typeof event.item.dataContext.level1) {
      this.state.level0 = this.props.genericData;
      event.chart.dataProvider = event.item.dataContext.level1;
      event.chart.validateData();
      event.chart.animateAgain();
    } else if ('object' === typeof event.item.dataContext.level2) {
      this.state.level1 = event.chart.dataProvider;
      event.chart.dataProvider = event.item.dataContext.level2;
      event.chart.validateData();
      event.chart.animateAgain();
    } else {
      this.setState({
        title: 'No More drill down data available',
      });
    }
    if (count <= 2) {
      count++;
      this.state.levelCount = count;
    }
  }
  drillBack() {
    this.setState({
      title: '',
    });
    if (this.state.levelCount > 0) {
      var count = this.state.levelCount;
      count--;
      if (count == 1) {
        this.state.event.chart.dataProvider = this.state.level1;
      } else if (count == 0) {
        this.state.event.chart.dataProvider = this.state.level0;
      }
      this.state.event.chart.validateData();
      this.state.event.chart.animateAgain();
      this.state.levelCount = count;
    } else {
      this.state.event.chart.dataProvider = this.props.genericData;
    }
  }
  handleClick(event) {
    // console.log(('From handleClick()', event);
  }
  resetChart() {
    // console.log(('Get the Object');
  }
  render() {
    return (
      <div>
        {this.props.genericData ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              type: 'serial',
              theme: 'light',
              dataProvider: this.props.genericData,
              valueAxes: [
                {
                  gridColor: '#FFFFFF',
                  gridAlpha: 0.2,
                  dashLength: 0,
                },
              ],
              titles: [
                {
                  text: this.state.title ? this.state.title : '',
                },
              ],
              allLabels: [
                {
                  text: '< Go Back',
                  bold: true,
                  x: 0,
                  y: 0,
                  url: 'javascript:drillBack()',
                },
              ],
              gridAboveGraphs: true,
              startDuration: 1,
              graphs: [
                {
                  balloonText: '[[category]]: <b>[[value]]</b>',
                  fillAlphas: 0.8,
                  lineAlpha: 0.2,
                  type: 'column',
                  valueField: 'counts',
                },
              ],
              chartCursor: {
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false,
              },
              categoryField: 'period',
              categoryAxis: {
                gridPosition: 'start',
                gridAlpha: 0,
                tickPosition: 'start',
                tickLength: 20,
              },
              export: {
                enabled: true,
              },
              listeners: [
                {
                  event: 'clickGraphItem',
                  method: event => {
                    this.drillDownFunction(event);
                  },
                },
              ],
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
