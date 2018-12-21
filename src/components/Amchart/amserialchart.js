import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';

export default class AmSerialAreaChart extends React.Component {
  /**
   *
   * Rxjs with POST
   * @returns
   * @memberof AmSerialAreaChart
   */

  render() {
    return (
      <div className="areaChartArea">
        {this.props.data2 ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              hideCredits: true,
              type: 'serial',
              theme: 'light',
              marginRight: 80,
              dataProvider: this.props.data2,

              valueAxes: [
                {
                  position: 'left',
                  title: 'Provider Count',
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
              chartCursor: {
                categoryBalloonDateFormat: 'JJ:NN, DD MMMM',
                cursorPosition: 'mouse',
              },
              categoryField: 'Date',
              categoryAxis: {
                minPeriod: 'mm',
                parseDates: true,
              },

              periodSelector: {
                periodsText: 'Duration:',
                fromText: 'From:',
                toText: 'To:',
                position: 'top',
                periods: [
                  // {
                  //   "period": "DD",
                  //  "count": 1,
                  //   "label": "D"},
                  {
                    period: 'MM',
                    count: 1,
                    label: 'D',
                  },
                  // {
                  //   "period": "MM",

                  //   "count": 3,
                  //   "label": "Q"},

                  {
                    period: 'MAX',
                    selected: true,
                    label: 'M',
                  },
                ],
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
