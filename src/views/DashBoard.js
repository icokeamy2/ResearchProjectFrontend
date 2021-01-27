import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  CardHeader, CardBody, Card
} from "shards-react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import RangeDatePicker from "../components/common/RangeDatePicker";
import SmallStats from "../components/common/SmallStats";
import TopReferrals from "../components/common/TopReferrals";
import CountryReports from "../components/common/CountryReports";
import Sessions from "../components/analytics/Sessions";
import UsersByDevice from "../components/analytics/UsersByDevice";
import GoalsOverview from "../components/analytics/GoalsOverview/GoalsOverview";
import GoogleMapReact from 'google-map-react';
import { GoogleMap, LoadScript,Marker,InfoWindow } from "@react-google-maps/api";
import colors from "../utils/colors";
import axios from "axios"
import {
  reqLogin, reqMap,
  reqPercentChart,
  reqRanking,
  reqSessionChart,
  reqWarning
} from "../api/api";
import LatestOrders from "../components/ecommerce/LatestOrders";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const mapStyles = {
  height: "50vh",
  width: "100%"};

const defaultCenter = {
  lat: -34.944675, lng: 138.648727
};
class DashBoard extends React.Component {



  constructor(props) {
    super(props);

this.state={
  date:new Date(),
  smallStats: [
    // {
    //   label: "Users",
    //   value: "2,390",
    //   percentage: "12.4%",
    //   increase: true,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: false,
    //   datasets: [
    //     {
    //       label: "Today",
    //       fill: "start",
    //       borderWidth: 1.5,
    //       backgroundColor: colors.primary.toRGBA(0.1),
    //       borderColor: colors.primary.toRGBA(),
    //       data: [0, 0, 0, 9, 9]
    //     }
    //   ]
    // },
    // {
    //   label: "Sessions",
    //   value: "8,391",
    //   percentage: "7.21%",
    //   increase: false,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: true,
    //   datasets: [
    //     {
    //       label: "Today",
    //       fill: "start",
    //       borderWidth: 1.5,
    //       backgroundColor: colors.success.toRGBA(0.1),
    //       borderColor: colors.success.toRGBA(),
    //       data: [3.9, 4, 4, 9, 4]
    //     }
    //   ]
    // },
    // {
    //   label: "Pageviews",
    //   value: "21,293",
    //   percentage: "3.71%",
    //   increase: true,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: false,
    //   datasets: [
    //     {
    //       label: "Today",
    //       fill: "start",
    //       borderWidth: 1.5,
    //       backgroundColor: colors.warning.toRGBA(0.1),
    //       borderColor: colors.warning.toRGBA(),
    //       data: [6, 6, 9, 3, 3]
    //     }
    //   ]
    // },
    // {
    //   label: "Pages/Session",
    //   value: "6.43",
    //   percentage: "2.71%",
    //   increase: false,
    //   chartLabels: [null, null, null, null, null],
    //   decrease: true,
    //   datasets: [
    //     {
    //       label: "Today",
    //       fill: "start",
    //       borderWidth: 1.5,
    //       backgroundColor: colors.salmon.toRGBA(0.1),
    //       borderColor: colors.salmon.toRGBA(),
    //       data: [0, 9, 3, 3, 3]
    //     }
    //   ]
    // }
  ],
  chartData: {
    labels: [
      "09:00 PM",
      "10:00 PM",
      "11:00 PM",
      "12:00 PM",
      "13:00 PM",
      "14:00 PM",
      "15:00 PM",
      "16:00 PM",
      "17:00 PM"
    ],
    datasets: [
      {
        label: "Today",
        fill: "start",
        data: [0,0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: colors.primary.toRGBA(0.1),
        borderColor: colors.primary.toRGBA(1),
        pointBackgroundColor: colors.white.toHex(),
        pointHoverBackgroundColor: colors.primary.toRGBA(1),
        borderWidth: 1.5
      },
      {
        label: "Yesterday",
        fill: "start",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: colors.salmon.toRGBA(0.1),
        borderColor: colors.salmon.toRGBA(1),
        pointBackgroundColor: colors.white.toHex(),
        pointHoverBackgroundColor: colors.salmon.toRGBA(1),
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0,
        pointBorderColor: colors.salmon.toRGBA(1)
      }
    ]
  },
  latestOrdersData: [
    {
      id: "#19280",
      date: "21 February 2018 20:32",
      status: "Suggestion",

    },
    {
      id: "#19279",
      date: "21 February 2018 20:32",
      status: "Warning",

    },
    {
      id: "#19278",
      date: "21 February 2018 20:32",
      status: "Danger",
    }
  ],
  location:
    {name: "Location 1",
      lo: {
      lat: -34.944675,
        lng: 138.648727
    }
    },
  selected:{},
  referralData: [
    {
      title: "GitHub",
      value: "19,291"
    },
    {
      title: "Stack Overflow",
      value: "11,201"
    },
    {
      title: "Hacker News",
      value: "9,291"
    },
    {
      title: "Reddit",
      value: "8,281"
    },
    {
      title: "The Next Web",
      value: "7,128"
    },
    {
      title: "Tech Crunch",
      value: "6,218"
    },
    {
      title: "YouTube",
      value: "1,218"
    },
    {
      title: "Adobe",
      value: "1,171"
    }
  ],
  roundchartData: {
    labels: ["Desktop", "Tablet", "Mobile"],
    datasets: [
      {
        hoverBorderColor: colors.white.toRGBA(1),
        data: [68.3, 24.2, 7.5],
        icons: [
           '<i class="material-icons">&#xE30B;</i>',
           '<i class="material-icons">&#xE32F;</i>',
           '<i class="material-icons">&#xE325;</i>'
        ],
        backgroundColor: [
          colors.primary.toRGBA(0.9),
          colors.primary.toRGBA(0.5),
          colors.primary.toRGBA(0.3)
        ]
      }
    ]
  },
    temp:"1",
    hum:"",
    soil:"",
  selectedSession:"Temperature",
  startDate:"",
  endDate:""



  // center: {
  //   lat:-34.921230,
  //   lng: 138.599503
  // },
  // zoom: 11,


}

  }



  async componentDidMount() {
    let res = await reqLogin();
    let sessionchart=await reqSessionChart("Temperature","0","0")
    let warning=await reqWarning()
    let ranking=await reqRanking()
    let percent=await reqPercentChart()
    let map=await reqMap()

    this.setState({smallStats:res.smallStats.smallStats})
   this.setState({chartData:sessionchart.smallStats.chartData})
    this.setState({latestOrdersData:warning.smallStats.latestOrdersData})
    this.setState({referralData:ranking.smallStats.referralData})
    this.setState({roundchartData:percent.smallStats.roundchartData})
    this.setState({location:map.smallStats.location})

    this.timerID=setInterval(()=>this.tick(),10000);
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  async tick() {
    let res = await reqLogin();
    let sessionchart = await reqSessionChart("Temperature", "0", "0")
    let warning = await reqWarning()
    let ranking = await reqRanking()
    let percent = await reqPercentChart()
    let map = await reqMap()

    this.setState({smallStats: res.smallStats.smallStats})
    if(this.state.temp==="1"){
      this.setState({chartData: sessionchart.smallStats.chartData})
    }

    this.setState({latestOrdersData: warning.smallStats.latestOrdersData})
    this.setState({referralData: ranking.smallStats.referralData})
    this.setState({roundchartData: percent.smallStats.roundchartData})
    this.setState({location: map.smallStats.location})
    this.setState({
      date: new Date()
    });
  }

  handleSizeChange = async e => {
    if (e === "Temperature") {
      this.setState({hum: ""});
      this.setState({soil: ""});
      this.setState({temp: "1"});
      this.setState({selectedSession:"Temperature"})
      const tmp = await reqSessionChart("Temperature",this.state.startDate,this.state.endDate)
      this.setState({chartData:tmp.smallStats.chartData})
      console.log(tmp)


    } else if (e === "Humidity") {
      this.setState({temp: ""});
      this.setState({soil: ""});
      this.setState({hum: "1"});
      this.setState({selectedSession:"Humidity"})
      const tmp = await reqSessionChart("Humidity",this.state.startDate,this.state.endDate)
      this.setState({chartData:tmp.smallStats.chartData})
      console.log(tmp)

    } else if (e === "Soil") {
      this.setState({temp: ""});
      this.setState({soil: "1"});
      this.setState({hum: ""});
      this.setState({selectedSession:"Soil"})
      const tmp = await reqSessionChart("Temperature",this.state.startDate,this.state.endDate)
      this.setState({chartData:tmp.smallStats.chartData})
      console.log(tmp)

    }

    console.log(e)


  };


  handleStartDateChange= (value) => {
    this.setState({
       startDate: new Date(value)
    });
    console.log(value)
  }

  handleEndDateChange= (value) =>  {
    this.setState({
      endDate: new Date(value)
    });
  }

  handleSearch= async () => {
    const tmp = await reqSessionChart(this.state.selectedSession, this.state.startDate, this.state.endDate)
    this.setState({chartData: tmp.smallStats.chartData})
  }


  render() {
    // const Marker = ({ show, place }) => {
    //   const markerStyle = {
    //     border: '1px solid white',
    //     borderRadius: '50%',
    //     height: 10,
    //     width: 10,
    //     backgroundColor: show ? 'red' : 'blue',
    //     cursor: 'pointer',
    //     zIndex: 10,
    //   };
    //   return (
    //     <>
    //       <div style={markerStyle} />
    //       {/*{show && <InfoWindow place={place} />}*/}
    //     </>
    //   );
    // };

    console.log(this.state.smallStats);
    console.log(this.state.chartData);


    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          {/* Page Header :: Title */}
          <PageTitle title="Dashboard" subtitle="Overview" className="text-sm-left mb-3" />

          {/* Page Header :: Actions */}
          <Col xs="12" sm="4" className="col d-flex align-items-center">
            {/*<ButtonGroup size="sm" className="d-inline-flex mb-3 mb-sm-0 mx-auto">*/}
            {/*  <Button theme="white" tag={NavLink} to="/analytics">*/}
            {/*    Traffic*/}
            {/*  </Button>*/}
            {/*  <Button theme="white" tag={NavLink} to="/ecommerce">*/}
            {/*    Sales*/}
            {/*  </Button>*/}
            {/*</ButtonGroup>*/}
          </Col>

          {/* Page Header :: Datepicker */}
          <Col sm="4" className="d-flex">
            {/*<RangeDatePicker className="justify-content-end" />*/}
          </Col>
        </Row>

        {/* Small Stats Blocks */}
        <Row>

          {this.state.smallStats.map((stats, idx) => (
            <Col key={idx} md="6" lg="3" className="mb-4">

              <SmallStats
                id={`small-stats-${idx}`}
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Sessions */}
          <Col  lg="8" md="12" sm="12" className="mb-4">
            <Card small className="h-100">
              {/* Card Header */}
              <CardHeader className="border-bottom">
                <h6 className="m-0">Trend</h6>
                <div className="block-handle" />
              </CardHeader>

              <CardBody className="pt-0">
                <Row className="border-bottom py-2 bg-light">
                  {/* Time Interval */}
                  <Col sm="6" className="col d-flex mb-2 mb-sm-0">
                    <ButtonGroup >
                      {this.state.temp && <Button theme="white" active value="Temperature" >
                        Temperature
                      </Button>}
                      {!this.state.temp && <Button theme="white" value="Temperature" onClick={()=>this.handleSizeChange("Temperature")}>
                        Temperature
                      </Button>}
                      {this.state.hum && <Button theme="white" active value="Humidity" >
                        Humidity
                      </Button>}
                      {!this.state.hum && <Button theme="white" value="Humidity" onClick={()=>this.handleSizeChange("Humidity")}>
                        Humidity
                      </Button>}
                      {this.state.soil && <Button theme="white" active value="Soil" >
                        Soil micronutrients
                      </Button>}
                      {!this.state.soil && <Button theme="white" value="Soil" onClick={()=>this.handleSizeChange("Soil")}>
                        Soil micronutrients
                      </Button>}


                      {/*<Button theme="white">Soil micronutrients</Button>*/}
                    </ButtonGroup>
                  </Col>

                  {/* DatePicker */}
                  <Col sm="3" className="col">

                    <RangeDatePicker  className="justify-content-end"
                                      handleStartDateChange={this.handleStartDateChange.bind(this)}
                                      handleEndDateChange={this.handleEndDateChange.bind(this)}
                                      startDate={this.state.startDate}
                                      endDate={this.state.endDate}
                    />
                  </Col>

                  <Col sm="3" className="col">
                    <Button theme="white" value="Search" onClick={()=>this.handleSearch()}>Search</Button>
                  </Col>
                </Row>

                <Sessions key={Math.random()}
                  chartData={this.state.chartData}
                />
              </CardBody>
            </Card>


          </Col>

          {/* Users by Device */}
          <Col key={Math.random()} lg="4" md="6" sm="6" className="mb-4">
            {/*<UsersByDevice />*/}
            <LatestOrders
              latestOrdersData={this.state.latestOrdersData}
            />
          </Col>

          {/* Top Referrals */}
          <Col key={Math.random()} lg="3" sm="6" className="mb-4">
            <TopReferrals
              referralData={this.state.referralData}/>
          </Col>

          {/* Goals Overview */}
          <Col  lg="5" className="mb-4">
            {/*<GoalsOverview />*/}
            <div style={{ height: '50vh', width: '100%' }}>
              {/*<GoogleMapReact*/}

              {/*  defaultCenter={this.state.center}*/}
              {/*  defaultZoom={this.state.zoom}*/}
              {/*>*/}

              {/*  <AnyReactComponent*/}


              {/*    text="My Marker"*/}

              {/*  />*/}
              {/*  <Marker>*/}
              {/*    lat={59.955413}*/}
              {/*    lng={30.337844}*/}
              {/*  </Marker>*/}
              {/*</GoogleMapReact>*/}
              <LoadScript
                googleMapsApiKey="AIzaSyCcjjcc73QSAcy3XOdsxA39peqSKJ2SfcM">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}>
                  <Marker key={"item.name"} position={this.state.location.lo} onClick={() => this.setState({selected:this.state.location})}/>
                  {
                    this.state.selected.lo &&
                    (
                      <InfoWindow
                        position={this.state.selected.lo}
                        clickable={true}
                        onCloseClick={() =>this.setState({selected:{}})}
                      >
                        <p>{this.state.selected.name}</p>
                      </InfoWindow>
                    )
                  }

                </GoogleMap>
              </LoadScript>


            </div>
          </Col>

          {/* Country Reports */}
          <Col key={Math.random()} lg="4" className="mb-4">
            {/*<CountryReports />*/}
            <UsersByDevice
              chartData={this.state.roundchartData}/>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default DashBoard;
