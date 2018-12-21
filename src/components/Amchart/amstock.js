import React, { Component } from 'react';
import Rx from '@reactivex/rxjs';
import AmCharts from '@amcharts/amcharts3-react';
import amstock from './amstock.less';
export default class AmStock extends React.Component {
  handleClick(event) {
    //// console.log(('#####From handleClick#######', event.event.target.defautValue);
    // console.log(('#####From handleClick#######', event);
    // 7 30 4 12
    // if (event.count) {
    //   var firstDate = new Date(2017, 0, 1);
    //   var endDate = new Date(2017, 11, 31);
    //   switch (event.count) {
    //     case 7:
    //       endDate = new Date(2017, 0, 7);
    //       break;
    //     case 31:
    //       endDate = new Date(2017, 0, 31);
    //       break;
    //     case 3:
    //       endDate = new Date(2017, 2, 31);
    //       break;
    //     case 12:
    //       endDate = new Date(2017, 11, 31);
    //       break;
    //   }
    //   event.startDate = firstDate
    //   event.endDate = endDate
    //   event.chart.validateData()
    // }
  }
  render() {
    return (
      <div className="amStockArea">
        {this.props.genericData ? (
          <AmCharts.React
            style={{ width: '95%', height: '350px', position: 'center' }}
            options={{
              theme: 'light',
              type: 'stock',
              dataSets: [
                {
                  fieldMappings: [
                    {
                      fromField: 'Active',
                      toField: 'Active',
                    },
                    {
                      fromField: 'Inactive',
                      toField: 'Inactive',
                    },
                  ],
                  dataProvider: this.props.genericData,
                  categoryField: 'Date',
                },
              ],
              panels: [
                {
                  legend: {
                    data: [
                      {
                        title: 'Active',
                        color: 'rgb(193, 251, 195, 1)',
                      },
                      {
                        title: 'InActive',
                        color: 'rgb(254, 137, 139, 1)',
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
                  stockGraphs: [
                    {
                      id: 'g1',
                      date: new Date(2016, 0, 1),
                      useDataSetColors: false,
                      bullet: 'round',
                      bulletSize: 2,
                      fillAlphas: 0.5,
                      lineColor: 'rgb(193, 251, 195, 1)',
                      valueField: 'Active',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Active:<b>[[value]]</b></div>",
                    },
                    {
                      id: 'g2',
                      date: new Date(2016, 0, 1),
                      useDataSetColors: false,
                      bullet: 'round',
                      bulletSize: 2,
                      fillAlphas: 0.5,
                      lineColor: 'rgb(254, 137, 139, 1)',
                      valueField: 'Inactive',
                      balloonText:
                        "<div style='margin:2px; font-size:10px;'>Inactive:<b>[[value]]</b></div>",
                    },
                  ],
                },
              ],
              panelsSettings: {
                marginLeft: 30,
              },
              categoryAxesSettings: {
                equalSpacing: true,
                gridAlpha: 0.1,
                showLastLabel: true,
              },
              valueAxesSettings: {
                gridAlpha: 0.1,
                inside: false,
                showLastLabel: true,
              },
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
                //"autoGridCount": true,
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
              //   "export": {
              //     "enabled": true,
              //     "position": "top-right",
              // },

              // "export": {
              //   "top": 0,
              //   "right":0,
              //   "enabled": true,
              //   "multiplier": 1.5,
              //   "position": "top-right",
              //   // "menu": [{
              //   //   "class": "export-main",
              //   //   "menu": ["JPG", "PDF"]
              //   // }],
              //   "content": ["Provider Trend Report",
              //     {
              //       "image": "reference",
              //       "fit": [523.28, 769.89], // fit image to A4
              //       "position": "center",
              //     }
              //   ],
              //   "dateFormat": "YYYY-MM-DD HH:NN:SS",
              //   "fileName": "Provider Trend Report",
              //   "menuReviver": function (item, li) {
              //     if (item.format === "JPG") {
              //       item.fileName = "Provider Trend Report"; //different file name for JPG files
              //     }
              //     return li;
              //   }
              // },

              periodSelector: {
                periodsText: 'Duration:',
                fromText: 'From:',
                toText: 'To:',
                position: 'top',
                selectFromStart: true,
                max_series: 365,
                custom_period_enabled: false,
                periods: [
                  {
                    period: 'DD',
                    count: 7,
                    label: 'W',
                  },
                  {
                    period: 'DD',
                    count: 31,
                    label: 'M',
                    //  selected:true
                  },
                  {
                    period: 'MM',
                    count: 3,
                    label: 'Q',
                  },
                  {
                    period: 'YYYY',
                    //  "count": 12,
                    count: 1,
                    label: 'Y',
                    selected: true,
                  },
                  {
                    period: 'YTD',
                    label: 'YTD',
                  },
                  // },
                  // {
                  //   "period": "MAX",
                  //   "label": "MAX",
                  //  // selected:true
                  // }
                ],
                listeners: [
                  {
                    event: 'changed',
                    method: event => {
                      this.handleClick(event);
                    },
                  },
                ],
              },
              balloon: {
                adjustBorderColor: true,
                color: '#000000',
                cornerRadius: 5,
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
