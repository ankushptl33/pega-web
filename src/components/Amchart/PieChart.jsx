import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';

export default class PieChart extends React.Component {
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
              type: 'pie',
              startDuration: 0,
              theme: 'light',
              addClassNames: true,
              legend: {
                position: 'right',
                marginRight: 100,
                autoMargins: false,
              },
              innerRadius: '30%',
              defs: {
                filter: [
                  {
                    id: 'shadow',
                    width: '200%',
                    height: '200%',
                    feOffset: {
                      result: 'offOut',
                      in: 'SourceAlpha',
                      dx: 0,
                      dy: 0,
                    },
                    feGaussianBlur: {
                      result: 'blurOut',
                      in: 'offOut',
                      stdDeviation: 5,
                    },
                    feBlend: {
                      in: 'SourceGraphic',
                      in2: 'blurOut',
                      mode: 'normal',
                    },
                  },
                ],
              },
              dataProvider: [
                {
                  country: 'Lithuania',
                  litres: 501.9,
                },
                {
                  country: 'Czech Republic',
                  litres: 301.9,
                },
                {
                  country: 'Ireland',
                  litres: 201.1,
                },
                {
                  country: 'Germany',
                  litres: 165.8,
                },
                {
                  country: 'Australia',
                  litres: 139.9,
                },
                {
                  country: 'Austria',
                  litres: 128.3,
                },
                {
                  country: 'UK',
                  litres: 99,
                },
                {
                  country: 'Belgium',
                  litres: 60,
                },
                {
                  country: 'The Netherlands',
                  litres: 50,
                },
              ],
              valueField: 'litres',
              titleField: 'country',
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
