import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Card } from 'antd';
import HForm from '../../components/HForm/HForm.jsx';

const { d3 } = window;
const svg_width = 500;
const svg_height = 400;
const div_id = 'myid-bar-chart';
const padding = {top: 20, left: 20, right: 20, bottom: 20 };
const rectStep = 35;
const rectWidth = 30;
const configs = [
  {
    config: {
      id: 'add_data',
      type: 'button',
      api: {
        type: 'primary',
      },
      ext: {
        label: '添加数据',
        value: '添加数据'
      }
    },
    extMap: {
      offset: true,
    }
  },
  {
    config: {
      id: 'sort_data',
      type: 'button',
      api: {
        type: 'primary',
      },
      ext: {
        label: '排序',
        value: '排序'
      }
    },
    extMap: {
      offset: true,
    }
  },
  {
    config: {
      id: 'remove_data',
      type: 'button',
      api: {
        type: 'primary',
      },
      ext: {
        label: '删除数据',
        value: '删除数据'
      }
    },
    extMap: {
      offset: true,
    }
  },
  {
    config: {
      id: 'shuffle_data',
      type: 'button',
      api: {
        type: 'primary',
      },
      ext: {
        label: '打乱数据',
        value: '打乱数据'
      }
    },
    extMap: {
      offset: true,
    }
  }
];
let dom_svg = null;

export default class MyBarChart extends Component {

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      add_data: '',
      sort_data: '',
      dataset: [50, 43, 120, 87, 99, 167, 142]
    }
  }

  componentDidMount() {
    this.onDraw(this.state.dataset);
  }

  handleChange = ({ id, value }) => {
    const { dataset } = this.state;
    let new_data = [...dataset];
    if (id === 'add_data') {
      const d = Math.max(Math.floor(Math.random() * 100), 20);
      new_data = [...dataset, d]
    } else if (id === 'sort_data') {
      new_data = dataset.sort(d3.ascending);
    } else if (id === 'remove_data') {
      const length = dataset.length;
      const d = Math.floor(Math.random() * length);
      new_data = dataset.filter((v, i) => i !== d)
    } else if (id === 'shuffle_data') {
      d3.shuffle(new_data);
    }

    this.setState({
      dataset: new_data,
    }, this.onDraw);
  }

  /**
   * 绘制数据
   */
  onDraw = () => {
    const { dataset } = this.state;
    if (!dom_svg) {
      dom_svg = d3.select('body')
        .select(`#${div_id}`)
        .append('svg')
        .attr('width', svg_width)
        .attr('height', svg_height)
    }

    renderRect({ svg: dom_svg, data: dataset });
    renderText({ svg: dom_svg, data: dataset });

    function renderRect({ svg, data }) {
      const update = svg.selectAll('rect').data(data);
      const enter = update.enter();
      const exit = update.exit();
      const attrs = {
        'fill': 'steelblue',
        'x': (d, i) => padding.left + i * rectStep,
        'y': (d, i) => svg_height - padding.bottom - d,
        'width': rectWidth,
        'height': d => d,
      }
      update.attr(attrs);
      enter.append('rect').attr(attrs);
      exit.remove();
    }

    function renderText({ svg, data }) {
      const update = svg.selectAll('text').data(data);
      const enter = update.enter();
      const exit = update.exit();
      const attrs = {
        'fill': '#fff',
        'font-size': '12px',
        'text-anchor': 'middle',
        'x': (d, i) => padding.left + i * rectStep,
        'y': (d, i) => svg_height - padding.bottom - d,
        'dx': rectWidth / 2,
        'dy': '1em',
      }
      update.attr(attrs).text(d => d);
      enter.append('text').attr(attrs).text(d => d);
      exit.remove();
    }
  }

  render() {
    return (
      <Card title="柱形图">
        <HForm
          layout="inline"
          configs={configs}
          onChange={this.handleChange}
          values={{}}
        />
        <div id={div_id}></div>
      </Card>
    )
  }

}

MyBarChart.propTypes = {

}
