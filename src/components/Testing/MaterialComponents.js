import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Icon, FavoriteOutlined, Edit } from '@material-ui/icons';
import Card from '@material-ui/core/Card';

import {
  BasicTable,
  LineChart,
  MeasurePerformanceStats,
  Performance,
  DateTimeLabel,
  PracticeContactForm,
  AddPractice,
  AddTinForm,
  PracticeForm,
  DataFormatExport,
  MasterTab,
  SearchComponent,
  Header,
  Footer,
  BasicAccordion,
  Measure,
  PasswordInput,
  BasicModal,
  MeasureFilter,
  PracticeNameHeader,
  BasicGrid,
  PracticeCardList,
  PaymentDetail,
  PracticeInformation,
  ComponentStacker,
  RightCornerFlag,
  PracticeGrid,
  PracticeEntityStats,
  ContactDetails,
  PracticeCard,
} from '../../json/NavigationMapping';

import DefaultProps from '../../json/DefaultProps.json';
import { tableData } from '../../json/DataTableSchema.json';
import './ComponentBuilding.less';

class MaterialComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...DefaultProps, expanded: null };
    //     this.handleChange = this.handleChange.bind(this);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;

    return (
      <Grid style={{ padding: '5rem 5rem' }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>1. Practice Card List:</h1>
            <h3>1.1 Right Corner Flag:</h3>
          </Grid>
          <Grid item xs={12}>
            <Grid container className="CornerFlagContainer">
              <RightCornerFlag {...this.state.RightCornerFlag} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'RightCornerFlag'}
              onChange={this.handleChange('RightCornerFlag')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="RightCornerFlag"
                  value={JSON.stringify(this.state.RightCornerFlag, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>1.2 Practice Information:</h3>
          </Grid>
          <Grid item xs={12}>
            <PracticeInformation {...this.state.PracticeInformation} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeInformation'}
              onChange={this.handleChange('PracticeInformation')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeInformation"
                  value={JSON.stringify(
                    this.state.PracticeInformation,
                    null,
                    2,
                  )}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>1.3 Practice Entity Stats:</h3>
          </Grid>
          <Grid item xs={12}>
            <PracticeEntityStats {...this.state.PracticeEntityStats} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeEntityStats'}
              onChange={this.handleChange('PracticeEntityStats')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeEntityStats"
                  value={JSON.stringify(
                    this.state.PracticeEntityStats,
                    null,
                    2,
                  )}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>1.4 Contact Details:</h3>
          </Grid>
          <Grid item xs={12}>
            <ContactDetails {...this.state.ContactDetails} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'ContactDetails'}
              onChange={this.handleChange('ContactDetails')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="ContactDetails"
                  value={JSON.stringify(this.state.ContactDetails, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>1.5 Practice Card:</h3>
          </Grid>
          <Grid item xs={12}>
            <Card className="componentbuilding__width_card">
              <PracticeCard {...this.state.PracticeCard} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeCard'}
              onChange={this.handleChange('PracticeCard')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeCard"
                  value={JSON.stringify(this.state.PracticeCard, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>
              Practice Card List:
              <br /> <sub>Final composition</sub>
            </h1>
          </Grid>
          <Grid item xs={12}>
            <PracticeCardList {...this.state.PracticeCardList} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeCardList'}
              onChange={this.handleChange('PracticeCardList')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeCardList"
                  value={JSON.stringify(this.state.PracticeCardList, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>2.Performance:</h1>
          </Grid>
          <Grid item xs={12}>
            <Performance {...this.state.Performance} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'Performance'}
              onChange={this.handleChange('Performance')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="Performance"
                  value={JSON.stringify(this.state.Performance, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>3.Basic Table:</h1>
          </Grid>
          <Grid item xs={12}>
            <BasicTable {...this.state.BasicTable} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'BasicTable'}
              onChange={this.handleChange('BasicTable')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="BasicTable"
                  value={JSON.stringify(this.state.BasicTable, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>4.Line Chart:</h1>
          </Grid>
          <Grid item xs={12}>
            <LineChart {...this.state.LineChart} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'LineChart'}
              onChange={this.handleChange('LineChart')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="LineChart"
                  value={JSON.stringify(this.state.LineChart, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>5.Clinician Grid:</h1>
          </Grid>
          <Grid item xs={12}>
            <BasicGrid
              columnDefs={columnDefsCl}
              data={this.state.ClinicianGrid.tableData}
            />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'ClinicianGrid'}
              onChange={this.handleChange('ClinicianGrid')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="ClinicianGrid"
                  value={JSON.stringify(this.state.ClinicianGrid, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>6.Practice Grid:</h1>
          </Grid>
          <Grid item xs={12}>
            <BasicGrid
              columnDefs={columnDefsPGrid}
              data={this.state.PracticeGrid.tableData}
            />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeGrid'}
              onChange={this.handleChange('PracticeGrid')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeGrid"
                  value={JSON.stringify(this.state.PracticeGrid, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>7.Payment Detail:</h1>
          </Grid>
          <Grid item xs={12}>
            <PaymentDetail {...this.state.PaymentDetail} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PaymentDetail'}
              onChange={this.handleChange('PaymentDetail')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PaymentDetail"
                  value={JSON.stringify(this.state.PaymentDetail, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>8.Component Stacker:</h1>
          </Grid>
          <Grid item xs={12}>
            <ComponentStacker {...this.state.ComponentStacker} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'ComponentStacker'}
              onChange={this.handleChange('ComponentStacker')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="ComponentStacker"
                  value={JSON.stringify(this.state.ComponentStacker, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>9.Master Tab :</h1>
          </Grid>
          <Grid item xs={12}>
            <MasterTab {...this.state.MasterTab} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'MasterTab'}
              onChange={this.handleChange('MasterTab')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="MasterTab"
                  value={JSON.stringify(this.state.MasterTab, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>10.Practice Form:</h1>
          </Grid>
          <Grid item xs={12}>
            <PracticeForm {...this.state.PracticeForm} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeForm'}
              onChange={this.handleChange('PracticeForm')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeForm"
                  value={JSON.stringify(this.state.PracticeForm, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        {/* <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h1>11.Login Form:</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <LoginForm {...this.state.LoginForm} />
                    </Grid>
                    <Grid item xs={6}>
                        <ExpansionPanel expanded={expanded === 'LoginForm'} onChange={this.handleChange('LoginForm')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >Default Properties</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <textarea rows="20" cols="200"
                                    name="LoginForm"
                                    value={JSON.stringify(this.state.LoginForm, null, 2)}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid> */}
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>12.Basic Accordion:</h1>
          </Grid>
          <Grid item xs={12}>
            <BasicAccordion {...this.state.BasicAccordion} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'BasicAccordion'}
              onChange={this.handleChange('BasicAccordion')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="BasicAccordion"
                  value={JSON.stringify(this.state.BasicAccordion, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>13.Basic Grid:</h1>
          </Grid>
          <Grid item xs={12}>
            <BasicGrid columnDefs={columnDefs} data={tableData} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'BasicGrid'}
              onChange={this.handleChange('BasicGrid')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="BasicGrid"
                  value={JSON.stringify(this.state.BasicGrid, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>14.Date Time Label:</h1>
          </Grid>
          <Grid item xs={12}>
            <DateTimeLabel {...this.state.DateTimeLabel} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'DateTimeLabel'}
              onChange={this.handleChange('DateTimeLabel')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="DateTimeLabel"
                  value={JSON.stringify(this.state.DateTimeLabel, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>15.Measure Performance Stats :</h1>
          </Grid>
          <Grid item xs={12}>
            <MeasurePerformanceStats {...this.state.MeasurePerformanceStats} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'MeasurePerformanceStats'}
              onChange={this.handleChange('MeasurePerformanceStats')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="MeasurePerformanceStats"
                  value={JSON.stringify(
                    this.state.MeasurePerformanceStats,
                    null,
                    2,
                  )}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>16.Data Format Export:</h1>
          </Grid>
          <Grid item xs={12}>
            <DataFormatExport {...this.state.DataFormatExport} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'DataFormatExport'}
              onChange={this.handleChange('DataFormatExport')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="DataFormatExport"
                  value={JSON.stringify(this.state.DataFormatExport, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>17.Search Component:</h1>
          </Grid>
          <Grid item xs={12}>
            <SearchComponent {...this.state.SearchComponent} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'SearchComponent'}
              onChange={this.handleChange('SearchComponent')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="SearchComponent"
                  value={JSON.stringify(this.state.SearchComponent, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>18.Header:</h1>
          </Grid>
          <Grid item xs={12}>
            <Header {...this.state.Header} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'Header'}
              onChange={this.handleChange('Header')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="Header"
                  value={JSON.stringify(this.state.Header, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>19.Footer:</h1>
          </Grid>
          <Grid item xs={12}>
            <Footer {...this.state.Footer} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'Footer'}
              onChange={this.handleChange('Footer')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="Footer"
                  value={JSON.stringify(this.state.Footer, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>20.Add Tin Form:</h1>
          </Grid>
          <Grid item xs={12}>
            <AddTinForm {...this.state.AddTinForm} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'AddTinForm'}
              onChange={this.handleChange('AddTinForm')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="AddTinForm"
                  value={JSON.stringify(this.state.AddTinForm, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>21.Basic Modal:</h1>
          </Grid>
          <Grid item xs={12}>
            <BasicModal {...this.state.BasicModal} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'BasicModal'}
              onChange={this.handleChange('BasicModal')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="BasicModal"
                  value={JSON.stringify(this.state.BasicModal, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>22.Practice Contact Form:</h1>
          </Grid>
          <Grid item xs={12}>
            <PracticeContactForm {...this.state.PracticeContactForm} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeContactForm'}
              onChange={this.handleChange('PracticeContactForm')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeContactForm"
                  value={JSON.stringify(
                    this.state.PracticeContactForm,
                    null,
                    2,
                  )}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        {/* <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h1>23.Login Branding:</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <LoginBranding {...this.state.LoginBranding} />
                    </Grid>
                    <Grid item xs={6}>
                        <ExpansionPanel expanded={expanded === 'LoginBranding'} onChange={this.handleChange('LoginBranding')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >Default Properties</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <textarea rows="20" cols="200"
                                    name="LoginBranding"
                                    value={JSON.stringify(this.state.LoginBranding, null, 2)}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid> */}
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>24.Password Input:</h1>
          </Grid>
          <Grid item xs={12}>
            <PasswordInput {...this.state.PasswordInput} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PasswordInput'}
              onChange={this.handleChange('PasswordInput')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PasswordInput"
                  value={JSON.stringify(this.state.PasswordInput, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>25.Practice Name Header:</h1>
          </Grid>
          <Grid item xs={12}>
            <PracticeNameHeader {...this.state.PracticeNameHeader} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'PracticeNameHeader'}
              onChange={this.handleChange('PracticeNameHeader')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="PracticeNameHeader"
                  value={JSON.stringify(this.state.PracticeNameHeader, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1>26.Measure Filter:</h1>
          </Grid>
          <Grid item xs={12}>
            <MeasureFilter {...this.state.MeasureFilter} />
          </Grid>
          <Grid item xs={6}>
            <ExpansionPanel
              expanded={expanded === 'MeasureFilter'}
              onChange={this.handleChange('MeasureFilter')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Default Properties</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <textarea
                  rows="20"
                  cols="200"
                  name="MeasureFilter"
                  value={JSON.stringify(this.state.MeasureFilter, null, 2)}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default MaterialComponents;

const columnDefs = [
  {
    favourite: {
      type: 'component',
      header: 'Icon',
      cssClasses: ['measure-performance'],
      style: {},
      component: {
        name: 'Icon',
        props: ['name'],
        component: FavoriteOutlined,
      },
    },
  },
  {
    id: {
      type: 'string',
      header: 'ID',
      cssClasses: ['measure-id', 'ankush', 'mak'],
      style: {},
    },
  },
  {
    measure: {
      type: 'component',
      header: 'MEASURE',
      cssClasses: ['measure-name'],
      style: {},
      component: {
        name: 'measure',
        props: [],
        component: Measure,
      },
    },
  },
  {
    performance: {
      type: 'component',
      header: 'ACHIEVED PERFORMANCE',
      cssClasses: ['measure-performance'],
      style: {},
      component: {
        name: 'Performance',
        props: ['performanceData'],
        component: Performance,
      },
    },
  },
  //,
  // {
  //     "measureDetails": {
  //         "header": 'Measure Details',
  //         "type": 'string',
  //         "data": false,
  //         "component": {
  //             "name": '',
  //             "props": ['text'],
  //             "component": Button,
  //             "events": [],
  //             "childrens": ['View Details']
  //         }
  //     }
  // }
];

const columnDefsCl = [
  {
    logo: {
      type: 'image',
      header: 'LOGO',
      cssClasses: [],
      style: {},
    },
  },
  {
    name: {
      type: 'string',
      header: 'NAME',
      cssClasses: [],
      style: {},
    },
  },
  {
    npi: {
      type: 'string',
      header: 'NPI',
      cssClasses: [],
      style: {},
    },
  },
  {
    clinicianType: {
      type: 'image',
      header: 'CLINICIAN TYPE',
      cssClasses: [],
      style: {},
    },
  },
  {
    role: {
      type: 'string',
      header: 'ROLE',
      cssClasses: [],
      style: {},
    },
  },
  {
    tinDetails: {
      type: 'string',
      header: 'TIN DETAILS',
      cssClasses: [],
      style: {},
    },
  },
  {
    tinFromDate: {
      type: 'string',
      header: 'TIN FROM DATE',
      cssClasses: [],
      style: {},
    },
  },
  {
    tinEndDate: {
      type: 'string',
      header: 'TIN END DATE',
      cssClasses: [],
      style: {},
    },
  },
  {
    phone: {
      type: 'string',
      header: 'CONTACT DETAILS',
      cssClasses: [],
      style: {},
    },
  },
  {
    mail: {
      type: 'string',
      header: 'EMAIL ID',
      cssClasses: [],
      style: {},
    },
  },
  {
    editIcon: {
      type: 'component',
      header: 'EDIT ICON',
      cssClasses: [],
      style: {},
      component: {
        name: 'Icon',
        props: ['name'],
        component: Edit,
      },
    },
  },
];

const columnDefsPGrid = [
  {
    logo: {
      type: 'image',
      header: 'LOGO',
      cssClasses: [],
      style: {},
    },
  },
  {
    name: {
      type: 'string',
      header: 'NAME',
      cssClasses: [],
      style: {},
    },
  },
  {
    npi: {
      type: 'string',
      header: 'NPI',
      cssClasses: [],
      style: {},
    },
  },
  {
    phone: {
      type: 'string',
      header: 'CONTACT DETAILS',
      cssClasses: [],
      style: {},
    },
  },
  {
    email: {
      type: 'string',
      header: 'EMAIL',
      cssClasses: [],
      style: {},
    },
  },
  {
    usertype: {
      type: 'string',
      header: 'USER TYPE',
      cssClasses: [],
      style: {},
    },
  },
  {
    editIcon: {
      type: 'component',
      header: 'EDIT ICON',
      cssClasses: [],
      style: {},
      component: {
        name: 'Icon',
        props: ['name'],
        component: Edit,
      },
    },
  },
];
