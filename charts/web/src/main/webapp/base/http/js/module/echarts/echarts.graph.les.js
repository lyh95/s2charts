/**
 * echarts关系图
 * Created by weifeng2017 on 2018/4/19.
 */
var dom = document.getElementById("echarts.graph.les");
var myChart = echarts.init(dom);
/*var app = {};
 option = null;
 */
var categories = [];
for (var i = 0; i < 9; i++) {
    categories[i] = {
        name: '数据' + i
    };
}
/*    graph.nodes.forEach(function (node) {
 node.itemStyle = null;
 node.value = node.symbolSize;
 node.symbolSize /= 1.5;
 node.label = {
 normal: {
 show: node.symbolSize > 30
 }
 };
 node.category = node.data;
 });*/
var option = {
    title: {
        text: 'Les Miserables',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
    },
    tooltip: {},
    legend: [{
        // selectedMode: 'single',
        data: categories.map(function (a) {
            return a.name;
        })
    }],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series : [
        {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            itemStyle: {
                normal: {
                    borderColor: 'rgb(236,81,72)'
                }
            },
            data: [{
                id: 0,
                category: 0,
                name: 'Myriel',
                symbolSize: 28.685715,
                x: -266.82776, y: 299.6904, z: 0.0
            }, {
                id: 1,
                category: 1,
                name: 'Valjean',
                symbolSize: 100.0,
                x: -87.93029, y: -6.8120565, z: 0.0
            }, {
                id: 2,
                category: 2,
                name: 'Fantine',
                symbolSize: 42.4,
                x: -313.42786, y: -289.44803, z: 0.0
            }, {
                id: 3,
                category: 7,
                name: 'Thenardier',
                symbolSize: 45.142853,
                x: 82.80825, y: -203.1144, z: 0.0
            }, {
                id: 4,
                category: 7,
                name: 'Javert',
                symbolSize: 47.88571,
                x: -81.46074, y: -204.20204, z: 0.0
            }, {
                id: 5,
                category: 3,
                name: 'Banatabois',
                symbolSize: 23.2,
                x: -385.6842, y: -20.206686, z: 0.0
            }, {
                id: 6,
                category: 8,
                name: 'Gavroche',
                symbolSize: 61.600006,
                x: 387.89572, y: 110.462326, z: 0.0
            }, {
                id: 7,
                category: 6,
                name: 'Marius',
                symbolSize: 53.37143,
                x: 206.44687, y: -13.805411, z: 0.0
            }, {
                id: 8,
                category: 8,
                name: 'Joly',
                symbolSize: 34.17143,
                x: 516.40784, y: 47.242233, z: 0.0
            }, {
                id: 9,
                category: 4,
                name: 'Fauchelevent',
                symbolSize: 22.228573,
                x: -225.73984, y: 82.41631, z: 0.0
            }, {
                id: 10,
                category: 5,
                name: 'MmeBurgon',
                symbolSize: 12.17143,
                x: 488.13535, y: 356.8573, z: 0.0
                /*}, {
                 id: 11,
                 category: 5,
                 name: 'Jondrette',
                 symbolSize: 6.17143,
                 x: 550.3201, y: 522.4031, z: 0.0*/
            }],
            links: [ //edges是其别名代表节点间的关系数据。
                {
                    source: 1,
                    target: 0
                }, {
                    source: 2,
                    target: 1
                }, {
                    source: 3,
                    target: 1
                }, {
                    source: 4,
                    target: 1
                }, {
                    source: 5,
                    target: 1
                }, {
                    source: 6,
                    target: 1
                }, {
                    source: 7,
                    target: 1
                }, {
                    source: 9,
                    target: 1
                }, {
                    source: 3,
                    target: 2
                }, {
                    source: 4,
                    target: 2
                }, {
                    source: 5,
                    target: 2
                }, {
                    source: 4,
                    target: 3
                }, {
                    source: 6,
                    target: 3
                }, {
                    source: 7,
                    target: 3
                }, {
                    source: 9,
                    target: 4
                }, {
                    source: 6,
                    target: 5
                }, {
                    source: 7,
                    target: 6
                }, {
                    source: 8,
                    target: 6
                }, {
                    source: 10,
                    target: 6
                }],
            categories: categories,
            roam: true,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.3
                }
            }
        }]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}