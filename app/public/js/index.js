window.onload = function(){
  //直接加载地图

  //初始化地图函数  自定义函数名init
  function init() {
    var sw = new qq.maps.LatLng(45.710540, 126.672342); //西南角坐标
    var ne = new qq.maps.LatLng(45.718960, 126.682878); //东北角坐标
    //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
    var map = new qq.maps.Map(document.getElementById("map"), {
      // 地图的中心地理坐标。
      center: new qq.maps.LatLng(45.7137085949,126.6769766808),
      //初始化地图缩放级别
      zoom: 17,

      minZoom: 16,
      maxZoom: 18,

      //如果为 true，在初始化地图时不会清除地图容器内的内容
      noClear: true,

      //用作地图 div 的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色。
      //仅在地图初始化时，才能设置此选项
      backgroundColor: "#ffffff",

      //boundary规定了地图的边界，当拖拽超出限定的边界范围后，会自动移动回来
      boundary:new qq.maps.LatLngBounds (sw, ne),

      //地图的默认鼠标指针样式
      draggableCursor: "crosshair",

      //拖动地图时的鼠标指针样式
      draggingCursor: "pointer",

      //地图类型ID
      mapTypeId: qq.maps.MapTypeId.SATELLITE,

      //若为false则禁止拖拽
      draggable: true,

      //若为false则禁止滑轮滚动缩放
      scrollwheel: true,

      //若为true则禁止双击放大
      disableDoubleClickZoom: false,

      //若为false则禁止键盘控制地图
      keyboardShortcuts: true,

      //地图类型控件，若为false则停用状态地图类型控件
      mapTypeControl: true,

      //地图类型控件参数
      mapTypeControlOptions: {
        mapTypeIds: [
            qq.maps.MapTypeId.ROADMAP,
            qq.maps.MapTypeId.HYBRID,
            qq.maps.MapTypeId.SATELLITE
        ],
        position: qq.maps.ControlPosition.TOP_RIGHT
      },

      //地图平移控件，若为false则不显示平移控件
      panControl: true,

      //地图平移控件参数
      panControlOptions: {
        position: qq.maps.ControlPosition.TOP_LEFT
      },

      //地图缩放控件，若为false则不显示缩放控件
      zoomControl: true,

      //地图缩放控件参数
      zoomControlOptions: {
        position: qq.maps.ControlPosition.TOP_LEFT
      },

      //地图比例尺控件，若为false则不显示比例尺控件
      scaleControl: true,

      //地图比例尺控件参数
      scaleControlOptions: {
        position: qq.maps.ControlPosition.BOTTOM_RIGHT
      }
    });
  }

  //调用初始化函数地图
  init();

}