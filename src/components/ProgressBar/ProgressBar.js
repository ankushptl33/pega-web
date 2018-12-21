import React, { Component } from 'react';
import './ProgressBar.less';
import PropTypes from 'prop-types';
import {
  Grid,
  Popover,
  Divider,
  Paper,
  LinearProgress,
  Typography,
  Tooltip,
} from '@material-ui/core';
const ProgressBar = props => {
  const benchmark = [...props.performanceData.benchMark];
  const filteredBenchMark = (benchmark, position) => {
    return benchmark.filter(item => {
      return item.position != null && item.position.toLowerCase() === position;
    });
  };

  const belowPosBenchmark = filteredBenchMark(benchmark, 'below');
  const abovePosBenchmark = filteredBenchMark(benchmark, 'above');

  const belowPosBenchmarkJsx = belowPosBenchmark.map((posData, index) => {
    return (
      <Tooltip key={index} title={posData.label}>
        <Grid
          container
          spacing={24}
          className="mark-parent cms__benchmark below--detail"
          key={index}
          style={{ left: `${posData.data}%` }}>
          <Grid item textAlign="center" className="mark-child">
            <i className="fas fa-caret-up" />
          </Grid>
          <Grid item textAlign="center" className="mark-child">
            {posData.data}
            <span>%</span>{' '}
          </Grid>
        </Grid>
      </Tooltip>
    );
  });

  const abovePosBenchmarkJsx = abovePosBenchmark.map((posData, index) => {
    return (
      <Tooltip key={index} title={posData.label}>
        <Grid
          container
          spacing={24}
          className="mark-parent registry__benchmark above-detail"
          key={index}
          style={{ left: `${posData.data}%` }}>
          <Grid item textAlign="center" className="mark-child">
            <span>{posData.data}</span>
            <span>%</span>{' '}
          </Grid>
          <Grid item textAlign="center" className="mark-child">
            <i className="fas fa-caret-down" />
          </Grid>
        </Grid>
      </Tooltip>
    );
  });

  const performanceStatsBlock = (
    <Grid
      item
      xs={
        props.performanceData.configuration != undefined &&
        props.performanceData.configuration.percentColumnSize != undefined
          ? props.performanceData.configuration.percentColumnSize
          : 2
      }
      textAlign="left"
      className="no-box-shadow no-margin font-size-20 performance__width--10 vertical-align-middle">
      <Tooltip title={props.performanceData.performanceText}>
        <Typography
          aria-owns={'mouse-over-popover'}
          aria-haspopup="true"
          className={`percent ${progressColorCode}`}>
          {props.performanceData.performance} %
        </Typography>
      </Tooltip>
    </Grid>
  );

  let progressColorCode =
    'no-box-shadow no-padding no-margin parent-progress progressbar ' +
    props.performanceData.colorcode;
  return (
    <Grid container className={progressColorCode}>
      {props.performanceData.performancePosition === 'left'
        ? performanceStatsBlock
        : null}
      <Grid
        item
        xs={
          props.performanceData.configuration != undefined &&
          props.performanceData.configuration.barColumnSize != undefined
            ? props.performanceData.configuration.barColumnSize
            : 10
        }
        textAlign="center"
        className="no-box-shadow no-border no-margin performance__width--90 progress_bar_wrapper ">
        {abovePosBenchmarkJsx}
        <Paper className="progress-segment" textAlign="left">
          <Paper
            className={`measure-performance-bar percent ${
              props.performanceData.colorcode
            }`}
            style={{ left: `${props.performanceData.performance}%` }}>
            I
          </Paper>
          <LinearProgress
            variant="determinate"
            className={`progress-bar percent ${progressColorCode}`}
            value={props.performanceData.performance}
            fitted="true"
            size="tiny"
          />
        </Paper>
        {belowPosBenchmarkJsx}
      </Grid>
      {props.performanceData.performancePosition !== 'left'
        ? performanceStatsBlock
        : null}
    </Grid>
  );
};
ProgressBar.defaultProps = {
  performanceData: {
    performanceText: 'Achieved Performance',
    performance: 49.59,
    performancePosition: '',
    benchMark: [
      {
        label: 'Registry Average',
        data: 75,
        position: 'above',
        colorcode: '',
      },
      {
        label: 'Registry BenchMark',
        data: 10,
        position: 'above',
        colorcode: '',
      },
      {
        label: 'CMS Average',
        data: 49,
        position: 'below',
        colorcode: '',
      },
    ],
    colorcode: 'progress-bar-success',
    configuration: {
      barColumnSize: 10,
      percentColumnSize: 2,
    },
  },
};
ProgressBar.propTypes = {
  performanceData: PropTypes.object,
};
export default ProgressBar;
