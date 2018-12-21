import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';

export default class LineChart extends React.Component {
  /**
   *
   */
  render() {
    return (
      <div className="areaChartArea">
        {this.props.genericData ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              type: 'serial',
              theme: 'light',
              dataProvider: this.props.genericData,
              graphs: [
                {
                  bulletSize: 14,
                  type: 'line',
                  bullet: 'round',
                  valueField: 'counts',
                  balloonText:
                    "<div style='margin:10px; text-align:left;'><span style='font-size:13px'>[[category]]</span><br><span style='font-size:18px'>Value:[[value]]</span>",
                },
              ],
              marginTop: 20,
              marginRight: 70,
              marginLeft: 40,
              marginBottom: 20,
              chartCursor: {
                graphBulletSize: 1.5,
                zoomable: false,
                valueZoomable: true,
                cursorAlpha: 0,
                valueLineEnabled: false,
                valueLineBalloonEnabled: true,
                valueLineAlpha: 0.2,
              },
              //"autoMargins": false,
              categoryField: 'period',
              //"valueScrollbar":{ "offset":30 },
              categoryAxis: {
                axisAlpha: 0,
                gridAlpha: 0,
                //"inside": true,
                tickLength: 0,
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
