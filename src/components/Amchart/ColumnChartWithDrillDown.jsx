import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';
import { getLabelOfObject } from '../../utils/utils';
/**
 * Remove this two fields from second graph if you need two adjacent vertical grpah line for active and inactive
  "clustered":false,
  "columnWidth":0.5,
  Type of the graph. Possible values are: "line", "column", "step", "smoothedLine", "candlestick", "ohlc". XY and Radar charts can only display "line" type graphs.
  Here we have used : type : column
  "fillColors": "#ffcd85" => are properties of AmGraph responsible for colors of bar.
 */
export default class ColumnChartWithDrillDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      level0: props.genericData,
      levelCount: 1,
      periodLevel: [],
      apiLevel: props.apiLevel,
    };
  }
  componentDidMount() {
    window.drillUp = this.drillUp.bind(this);
  }
  drillUp() {
    if (this.state.levelCount > 1) {
      this.state.periodLevel.pop();
      this.state.levelCount--;
      this.props.drillAPIData(this.state.periodLevel);
    }
  }
  drillDown(event) {
    if (
      'undefined' == typeof this.state.periodLevel[this.state.levelCount] &&
      this.state.levelCount < this.state.apiLevel.highrarchy.length
    ) {
      let level = 'level' + this.state.levelCount;
      let highracy = this.state.apiLevel.highrarchy[this.state.levelCount];
      this.state.periodLevel.push(
        level + ':' + highracy + ':' + event.item.dataContext.period,
      );
      this.props.drillAPIData(this.state.periodLevel);
      this.state.levelCount++;
    }
  }
  render() {
    return (
      <div>
        {this.props.resultData ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              type: 'serial',
              theme: 'light',
              dataProvider: this.props.resultData,
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
                  url: 'javascript:drillUp()',
                },
              ],
              gridAboveGraphs: true,
              startDuration: 1,
              legend: {
                data: [
                  {
                    title: 'Active',
                    color: '#c1fbc3',
                  },
                  {
                    title: 'InActive',
                    color: '#fe898b',
                  },
                ],
                position: 'top',
                listeners: [
                  {
                    event: 'clickLabel',
                    method: event => {
                      this.handleClick(event);
                    },
                  },
                ],
              },
              graphs: [
                {
                  balloonText: '[[category]]: <b>[[value]]</b>',
                  fillAlphas: 0.9,
                  lineAlpha: 0.2,
                  type: 'column',
                  valueField: 'active',
                  fillColors: 'rgb(193, 251, 195, 1)',
                },
                {
                  balloonText: '[[category]]: <b>[[value]]</b>',
                  fillAlphas: 0.9,
                  lineAlpha: 0.2,
                  type: 'column',
                  valueField: 'inactive',
                  clustered: false,
                  columnWidth: 0.5,
                  fillColors: '#fe898b',
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
                    this.drillDown(event);
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
