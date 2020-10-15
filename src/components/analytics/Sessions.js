import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  Button
} from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";

import colors from "../../utils/colors";
import Chart from "../../utils/chart";
import {reqSessionChart} from "../../api/api";

class Sessions extends React.Component {
  constructor(props) {
    super(props);

    this.legendRef = React.createRef();
    this.canvasRef = React.createRef();
    // this.state={
    //   temp:"1",
    //   hum:"",
    //   soil:"",
    //
    // }
  }


  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: false,
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.38
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  return index % 2 === 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45
              }
            }
          ]
        },
        tooltips: {
          enabled: false,
          mode: "index",
          position: "nearest"
        }
      },
      ...this.props.chartOptions
    };

    const AnalyticsOverviewChart = new Chart(this.canvasRef.current, {
      type: "line",
      data: this.props.chartData,
      options: chartOptions
    });

    // Generate the analytics overview chart labels.
    this.legendRef.current.innerHTML = AnalyticsOverviewChart.generateLegend();

    // Hide initially the first and last analytics overview chart points.
    // They can still be triggered on hover.
    const meta = AnalyticsOverviewChart.getDatasetMeta(0);
    meta.data[0]._model.radius = 0;
    meta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    console.log(this.props.chartData)
    AnalyticsOverviewChart.render();
  }
  // handleSizeChange = async e => {
  //   if (e === "Temperature") {
  //     this.setState({hum: ""});
  //     this.setState({soil: ""});
  //     this.setState({temp: "1"});
  //     const tmp = await reqSessionChart("Temperature","1","0")
  //
  //
  //   } else if (e === "Humidity") {
  //     this.setState({temp: ""});
  //     this.setState({soil: ""});
  //     this.setState({hum: "1"});
  //
  //   } else if (e === "Soil") {
  //     this.setState({temp: ""});
  //     this.setState({soil: "1"});
  //     this.setState({hum: ""});
  //
  //   }
  //
  //   console.log(e)
  //
  // };

  render() {



    const { title } = this.props;

    return (
      <Card small >
        {/* Card Header */}
        {/*<CardHeader className="border-bottom">*/}
        {/*  <h6 className="m-0">{title}</h6>*/}
        {/*  <div className="block-handle" />*/}
        {/*</CardHeader>*/}

        <CardBody className="pt-0">

          {/*<Row className="border-bottom py-2 bg-light">*/}
            {/* Time Interval */}
            {/*<Col sm="3" className="col d-flex mb-2 mb-sm-0">*/}
            {/*  <ButtonGroup >*/}
            {/*    {this.state.temp && <Button theme="white" active value="Temperature" >*/}
            {/*      Temperature*/}
            {/*    </Button>}*/}
            {/*    {!this.state.temp && <Button theme="white" value="Temperature" onClick={()=>this.handleSizeChange("Temperature")}>*/}
            {/*      Temperature*/}
            {/*    </Button>}*/}
            {/*    {this.state.hum && <Button theme="white" active value="Humidity" >*/}
            {/*      Humidity*/}
            {/*    </Button>}*/}
            {/*    {!this.state.hum && <Button theme="white" value="Humidity" onClick={()=>this.handleSizeChange("Humidity")}>*/}
            {/*      Humidity*/}
            {/*    </Button>}*/}
            {/*    {this.state.soil && <Button theme="white" active value="Soil" >*/}
            {/*      Soil micronutrients*/}
            {/*    </Button>}*/}
            {/*    {!this.state.soil && <Button theme="white" value="Soil" onClick={()=>this.handleSizeChange("Soil")}>*/}
            {/*      Soil micronutrients*/}
            {/*    </Button>}*/}


            {/*    /!*<Button theme="white">Soil micronutrients</Button>*!/*/}
            {/*  </ButtonGroup>*/}
            {/*</Col>*/}

            {/*/!* DatePicker *!/*/}
            {/*<Col sm="6" className="col">*/}
            {/*  <RangeDatePicker className="justify-content-end" />*/}
            {/*  <RangeDatePicker className="justify-content-end" />*/}
            {/*</Col>*/}
          {/*</Row>*/}

          <div ref={this.legendRef} />
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
            className="analytics-overview-sessions"
          />
        </CardBody>
      </Card>
    );
  }
}

Sessions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The Chart.js data.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js config options.
   */
  chartOptions: PropTypes.object
};

Sessions.defaultProps = {
  title: "Trend",


};

export default Sessions;
