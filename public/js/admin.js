$(function() {
  var map = new AMap.Map('map', {
      center: [126.683507, 45.713941],
      zoom: 16
  });

  var companyPolygon = new AMap.Polygon({
    map: map,
    strokeColor: "#0000ff",
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: "#f5deb3",
    fillOpacity: 0.35
  });
  // 异步请求公司数据，在地图上绘制
  $.ajax({
    url: '/api/company',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(obj) {
    companyPolygon.setPath(obj.polygon);
    console.log('公司path数据载入成功');
  })


  AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.MapType', 'AMap.Geolocation'],
  function(){
    map.addControl(new AMap.ToolBar());

    map.addControl(new AMap.Scale());
    // map.addControl(new AMap.MapType());
    map.addControl(new AMap.Geolocation());
  });

  // 加载鼠标绘制多边形插件
  var mouseTool = new AMap.MouseTool(map); //在地图中添加MouseTool插件
  map.plugin(mouseTool);
  // 定义绘制的多边形及路径
  var drawPolygon, path;
  // 添加事件监听按钮点击
  AMap.event.addDomListener(document.getElementById('addArea'), 'click', function() {
    drawPolygon = mouseTool.polygon(); //用鼠标工具画多边形
    map.setMapStyle('amap://styles/dark');
  }, false);
  // 定义多边形的路径，待后面赋值
  // 监听鼠标画完事件
  AMap.event.addListener( mouseTool,'draw',function(e){ //添加事件
    path = e.obj.getPath();
    mouseTool.close(true); //画完后把画的图擦除，然后根据path绘制多边形
    drawPolygon = new AMap.Polygon({
      map: map,
      path: path,
      strokeColor: "#0000ff",
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: "#f5deb3",
      fillOpacity: 0.35
    });
    drawPolygonEdit = new AMap.PolyEditor(map,drawPolygon); // 接着把绘制的多边形变成可编辑状态
    drawPolygonEdit.open();
    // 添加确认/结束按钮
    $('#buttonBox').append($('<input>').attr('type', 'button').attr('value', '重画范围').attr('id', 'restArea'));
    $('#buttonBox').append($('<input>').attr('type', 'button').attr('value', '编辑范围').attr('id', 'editArea'));
    $('#buttonBox').append($('<input>').attr('type', 'button').attr('value', '确认范围').attr('id', 'confirmArea'));
    // 确认多边形范围dom事件
    AMap.event.addDomListener(document.getElementById('confirmArea'), 'click', function() {
      drawPolygonEdit.close();
      path = drawPolygon.getPath(); //获取路径/范围
    }, false);
    // 确认多边形范围dom事件
    AMap.event.addDomListener(document.getElementById('editArea'), 'click', function() {
      drawPolygonEdit.open();
    }, false);
    // 添加重画事件按钮事件
    AMap.event.addDomListener(document.getElementById('restArea'), 'click', function() {
      drawPolygonEdit.close();
      drawPolygon.setMap(null);
      $('#restArea').remove();
      $('#editArea').remove();
      $('#confirmArea').remove();
    }, false);
  });
  // ajax异步提交
  $('form').submit(function(ev) {
    console.log(path);
    // 取消默认的体检事件，使用ajax提交表单
    ev.preventDefault();
    var form = $(this);
    $.ajax({
      url: form.attr('action'),
      type: 'POST',
      data: form.serialize()+'&polygon='+ JSON.stringify(path)
    })
    .done(function(obj) {
      console.log('上传成功');
      console.log(obj);
      var companyPolygon = new AMap.Polygon({
        path: obj.path,
        strokeColor: "#0000ff",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: "#f5deb3",
        fillOpacity: 0.35
      });

      companyPolygon.setMap(map);

      var content = $('<div></div>');
      var companyName = $('<p>').text(obj.name);
      var companyInfo = $('<p>').text(obj.info);
      content.append(companyName).append(companyInfo);
      $('#company').append(content);
    });
  });
})