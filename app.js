(function () {
  var el = document.getElementById('mindmap');
  if (!el) return;

  // ✅ Load data from routes.json
  fetch('routes.json')
    .then(res => res.json())
    .then(treeData => {
      var chart = echarts.init(el);

      var layerColors = ['#2c3e50', '#34495e', '#3d566e', '#46627f', '#527394'];

      function boxSize(name) {
        var w = Math.max(140, Math.min(260, name.length * 9));
        return [w, 32];
      }

      var option = {
        backgroundColor: '#0f1416',
        series: [{
          type: 'tree',
          data: [treeData],
          orient: 'LR',  // left-to-right
          symbol: 'rect',
          symbolSize: function (v, params) {
            return boxSize(params.name || '');
          },
          expandAndCollapse: true,
          initialTreeDepth: 2,
          roam: true,
          edgeShape: 'curve',
          edgeForkPosition: '63%',
          label: {
            position: 'inside',
            verticalAlign: 'middle',
            align: 'center',
            color: '#ecf0f1',
            fontSize: 13,
            fontWeight: 600
          },
          lineStyle: {
            color: '#6c7a89',
            width: 1.4
          },
          itemStyle: {
            borderColor: '#95a5a6',
            borderWidth: 1,
            borderRadius: 4,
            color: function (params) {
              var d = params.data.depth || params.depth || 0;
              return layerColors[d % layerColors.length];
            }
          },
          emphasis: {
            itemStyle: {
              borderColor: '#f1c40f',
              borderWidth: 2
            },
            label: {
              color: '#ecf0f1'
            }
          }
        }]
      };

      chart.setOption(option);
      window.addEventListener('resize', function () { chart.resize(); });
    });
})();
