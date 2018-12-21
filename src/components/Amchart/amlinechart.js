import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';

export default class AmLineAreaChart extends React.Component {
  /**
   *
   * Rxjs with POST
   * @returns
   * @memberof AmLineAreaChart
   */

  render() {
    //  // console.log(('Am line chart data#######');
    //   // console.log((this.props.AmLineChartData);
    return (
      <div className="areaChartArea">
        {this.props.genericData ? (
          <AmCharts.React
            style={{ width: '100%', height: '300px' }}
            options={{
              theme: 'light',
              type: 'stock',
              hideCredits: true,

              // "categoryAxesSettings": {
              //   "minPeriod": "hh"
              // },
              dataSets: [
                {
                  color: '#b0de09',
                  fieldMappings: [
                    {
                      fromField: 'Active',
                      toField: 'Active',
                    },
                    {
                      fromField: 'Inactive',
                      toField: 'Inactive',
                    },
                    {
                      fromField: 'Active Leads',
                      toField: 'Active Leads',
                    },
                    {
                      fromField: 'Registaration',
                      toField: 'Registaration',
                    },
                    {
                      fromField: 'Data Extraction',
                      toField: 'Data Extraction',
                    },
                    {
                      fromField: 'CMS Reporting',
                      toField: 'CMS Reporting',
                    },
                    {
                      fromField: 'Production',
                      toField: 'Production',
                    },
                  ],
                  dataProvider: this.props.genericData,
                  categoryField: 'Date',
                },
              ],

              panels: [
                {
                  showCategoryAxis: true,

                  stockGraphs: [
                    {
                      id: 'g1',
                      useDataSetColors: false,
                      lineColor: 'rgb(114,188,247)',
                      valueField: 'Active',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Active:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g2',
                      useDataSetColors: false,
                      lineColor: '#800080',
                      valueField: 'Inactive',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Active:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g3',
                      useDataSetColors: false,
                      lineColor: '#E2CD0F',
                      valueField: 'Active Leads',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Active Leads:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g4',
                      useDataSetColors: false,
                      lineColor: '#30A2F6',
                      valueField: 'Registaration',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Registaration:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g5',
                      useDataSetColors: false,
                      lineColor: '#F1610B',
                      valueField: 'Data Extraction',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Data Extraction:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g6',
                      useDataSetColors: false,
                      lineColor: '#826BD7',
                      valueField: 'CMS Reporting',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>CMS Reporting:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g7',
                      useDataSetColors: false,
                      lineColor: '#58B518',
                      valueField: 'Production',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Production:<b>[[value]]</b></div>",
                    },
                  ],
                },
              ],

              chartScrollbarSettings: {
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
              chartCursorSettings: {
                valueBalloonsEnabled: true,
                bulletsEnabled: true,
                fullWidth: false,
                cursorAlpha: 0.5,
                valueLineBalloonEnabled: false,
                valueLineEnabled: false,
                valueLineAlpha: 0.5,
              },
              periodSelector: {
                periodsText: 'Duration:',
                fromText: 'From:',
                toText: 'To:',
                position: 'top',
                periods: [
                  {
                    period: 'MM',
                    count: 1,
                    label: 'Daily',
                  },
                  // {
                  // "period": "MM",
                  // "count": 1,
                  // "label": "D"},
                  // {
                  //   "period": "MM",

                  //   "count": 3,
                  //   "label": "Q"},

                  {
                    period: 'YYY',
                    count: 365,
                    selected: true,
                    label: 'Monthly',
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
