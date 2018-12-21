import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';

export default class TrendLine extends React.Component {
  /**
   *
   */

  render() {
    return (
      <div className="areaChartArea">
        {this.props.ColumnChartData ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              type: 'serial',
              theme: 'light',
              marginRight: 80,
              autoMarginOffset: 20,
              dataDateFormat: 'YYYY-MM-DD HH:NN',
              dataProvider: this.props.ColumnChartData,
              valueAxes: [
                {
                  axisAlpha: 0,
                  guides: [
                    {
                      fillAlpha: 0.1,
                      fillColor: '#888888',
                      lineAlpha: 0,
                      toValue: 16,
                      value: 10,
                    },
                  ],
                  position: 'left',
                  tickLength: 0,
                },
              ],
              graphs: [
                {
                  balloonText:
                    "[[category]]<br><b><span style='font-size:14px;'>value:[[value]]</span></b>",
                  bullet: 'round',
                  dashLength: 3,
                  colorField: 'color',
                  valueField: 'visits',
                },
              ],
              trendLines: [
                {
                  finalDate: '2012-01-11 12',
                  finalValue: 19,
                  initialDate: '2012-01-02 12',
                  initialValue: 10,
                  lineColor: '#CC0000',
                },
                {
                  finalDate: '2012-01-22 12',
                  finalValue: 10,
                  initialDate: '2012-01-17 12',
                  initialValue: 16,
                  lineColor: '#CC0000',
                },
              ],
              chartScrollbar: {
                scrollbarHeight: 2,
                offset: -1,
                backgroundAlpha: 0.1,
                backgroundColor: '#888888',
                selectedBackgroundColor: '#67b7dc',
                selectedBackgroundAlpha: 1,
              },
              chartCursor: {
                fullWidth: true,
                valueLineEabled: true,
                valueLineBalloonEnabled: true,
                valueLineAlpha: 0.5,
                cursorAlpha: 0,
              },
              categoryField: 'month',
              categoryAxis: {
                parseDates: true,
                axisAlpha: 0,
                gridAlpha: 0.1,
                minorGridAlpha: 0.1,
                minorGridEnabled: true,
              },
              export: {
                enabled: true,
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
