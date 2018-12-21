import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';
import { getLabelOfObject } from '../../utils/utils';

export default class ColumnChart extends React.Component {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      title: 'Yearly Data',
      graphData: props.genericData,
      level0: props.genericData,
      levelCount: 0,
    };

    var myObject = [
      {
        obj1: 'val1',
        level1: [{ obj2: 'val2' }, { obj3: 'val3' }],
      },
      { obj2: 'val2' },
      { obj3: 'val3' },
    ];
    var myObject2 = {
      obj1: 'val1',
      level1: [
        {
          obj2: 'val2',
          level1: [
            { obj2: 'val2', level1: [{ obj2: 'val2' }, { obj3: 'val3' }] },
            { obj3: 'val3' },
          ],
        },
        { obj3: 'val3' },
      ],
    };
    var myObject3 = {
      test1: 'rest1',
      test2: 'rest2',
      level: [],
    };
    var myObject4 = {
      test1: 'rest1',
      test2: 'rest2',
    };

    var myObject6 = [
      {
        test1: 'rest1',
        test2: 'rest2',
      },
    ];
    this.labelObject = getLabelOfObject(myObject2, 0);
    // console.log(('Lable', this.labelObject);
  }

  componentDidMount() {
    // console.log(('Component Did mount!');
    window.drillUp = this.drillUp.bind(this);
  }
  drillDown(event) {
    var count = this.state.levelCount;
    // console.log(('drillDown', count);
    // console.log(('State..', this.state);
    // console.log(('##labelObject ##', this.labelObject);
    this.state.event = event;

    if ('object' === typeof event.item.dataContext.level1) {
      // console.log(('IF');
      this.setState({
        title: 'Quaterly Data',
      });
      this.state.level0 = this.props.genericData;
      event.chart.dataProvider = event.item.dataContext.level1;

      // this.setState({
      //     level0:this.props.genericData
      // });
      event.chart.validateData();
      event.chart.animateAgain();
    } else if ('object' === typeof event.item.dataContext.level2) {
      this.setState({
        title: 'Monthly Data',
      });
      this.state.level1 = event.chart.dataProvider;
      event.chart.dataProvider = event.item.dataContext.level2;

      // this.setState({
      //     //graphData: event.item.dataContext.level1
      //     level0: event.item.dataContext.level1
      // });
      //this.state.graphData = event.item.dataContext.level1;
      event.chart.validateData();
      event.chart.animateAgain();
    } else {
      // console.log(('ELSE');
      this.setState({
        title: 'Yearly Data',
      });
      //this.state.level2 = event.chart.dataProvider;
      // event.chart.dataProvider = this.props.genericData;
      // event.chart.validateData();
      // event.chart.animateAgain();
    }
    if (count <= 2) {
      count++;
      this.state.levelCount = count;
    }
  }
  drillUp() {
    // console.log(('State..', this.state);
    if (this.state.levelCount > 0) {
      var count = this.state.levelCount;
      // console.log(('Count =', count);
      count--;
      if (count == 1) {
        this.state.event.chart.dataProvider = this.state.level1;
      } else if (count == 0) {
        this.state.event.chart.dataProvider = this.state.level0;
      }

      this.state.event.chart.validateData();
      this.state.event.chart.animateAgain();

      this.state.levelCount = count;

      //// console.log(('drillUp', AmCharts.React.dataContext);
      //// console.log(('drillUp', this.state.levelCount);
      //// console.log((this);
      //     this.setState({
      //         graphData:this.props.genericData
      // });
      //this.forceUpdate();

      // if ('object' === typeof this.state.level2) {
      //     // console.log(('level2', this.state.level2);
      //     this.state.event.chart.dataProvider = this.state.level2;
      //     this.state.level2 = null;

      // } else if ('object' === typeof this.state.level1) {
      //     // console.log(('level1', this.state.level1);
      //     this.state.event.chart.dataProvider = this.state.level1;
      //    // this.state.level1 = null;
      // } else {
      //     // console.log(('level0');
      //     this.state.event.chart.dataProvider = this.props.genericData;
      // }

      //event.chart.dataProvider = this.props.genericData;
      //event.chart.dataProvider
      //// console.log(('Why drillUp', this.state.levelCount);
    } else {
      this.state.event.chart.dataProvider = this.props.genericData;
      this.state.event.chart.validateData();
      this.state.event.chart.animateAgain();
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
      <div className="areaChartArea">
        {this.props.genericData ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              type: 'serial',
              theme: 'light',
              dataProvider: this.state.graphData,
              valueAxes: [
                {
                  gridColor: '#FFFFFF',
                  gridAlpha: 0.2,
                  dashLength: 0,
                },
              ],
              titles: [
                {
                  text: this.props.title ? this.props.title : this.state.title,
                },
              ],
              allLabels: [
                {
                  text: '< Go Back',
                  bold: true,
                  x: 20,
                  y: 20,
                  url: 'javascript:drillUp()',
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
