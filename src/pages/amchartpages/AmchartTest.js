import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
// import './App.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Avatar } from "antd";
import { collection, getDocs } from "@firebase/firestore";
import db from "../../firebase";
import { Spin } from "antd";
var data = [
  {
    name: "Monica",
    steps: 45688,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
    },
  },
  {
    name: "Joey",
    steps: 35781,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg",
    },
  },
  {
    name: "Ross",
    steps: 25464,
    pictureSettings: {
      src: require(`../Images/${`arvinth@citma`}.jpeg`).default,
    },
  },
  {
    name: "Phoebe",
    steps: 18788,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg",
    },
  },
  {
    name: "Rachel",
    steps: 15465,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg",
    },
  },
  {
    name: "Chandler",
    steps: 11561,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg",
    },
  },
];

function AmChartDemo({ batchNoFromTab }) {
  const [batchNoOnClickFromTab, setbatchNoOnClickFromTab] = useState(
    batchNoFromTab || 5
  );
  const [dataForMembers, setDataForMembers] = useState(data);
  const [chartLoadChecker, setchartLoadChecker] = useState(false);
  const [TotalDaysForTheBatch, setTotalDaysForTheBatch] = useState(0);
  useEffect(() => {
    if (batchNoFromTab) {
      setbatchNoOnClickFromTab(batchNoFromTab);
    }
  }, []);

  useEffect(() => {
    async function getallData() {
      const querySnapshot = await getDocs(collection(db, "studentTaskDetails"));
      let userArray = [];
      querySnapshot.forEach((doc) => {
        userArray.push(doc.data());
      });

      let membersFilterFromBatch = userArray.filter((filterIt) => {
        return filterIt.batch == batchNoOnClickFromTab;
      });
      let memberNamesFromBatch = [
        ...new Set(
          membersFilterFromBatch.map((o) => {
            return o.username;
          })
        ),
      ];
      let calculateTheDaysUNique = [
        ...new Set(
          membersFilterFromBatch.map((o) => {
            return o["Date-Pick"];
          })
        ),
      ];
      let calculateByStudent = memberNamesFromBatch.map((member) => {
        let count = 0;
        let userEmail = "";
        let specifiedMemberOnloopFilter = membersFilterFromBatch
          .filter((a) => {
            userEmail = a.name;
            return a.username == member;
          })
          .reduce((acc, filteredForMember) => {
            userEmail = filteredForMember.email;
            acc += filteredForMember.slider;
            count++;
            return acc;
          }, 0);

        return {
          name: member,
          steps: Number(
            (
              (specifiedMemberOnloopFilter /
                (calculateTheDaysUNique.length * 100)) *
              100
            ).toFixed(1)
          ),
          pictureSettings: {
            src: require(`../Images/${userEmail}.jpeg`).default,
          },
        };
      });

      let preparedDataSet = calculateByStudent;

      setTotalDaysForTheBatch(calculateTheDaysUNique.length);
      setchartLoadChecker(true);
      setDataForMembers(preparedDataSet);
      setchartLoadChecker(true);

      console.log(userArray);
    }
    getallData();
  }, []);

  useLayoutEffect(() => {
    var root = am5.Root.new(`chartdiv${batchNoOnClickFromTab}`);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingBottom: 50,
        paddingTop: 40,
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    var xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("visible", false);

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        paddingTop: 40,
        categoryField: "name",
        renderer: xRenderer,
      })
    );

    var yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("strokeDasharray", [3]);

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: yRenderer,
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Income",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "steps",
        categoryXField: "name",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: am5.Tooltip.new(root, {
          dy: -30,
          pointerOrientation: "vertical",
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxWidth: 50,
      fillOpacity: 0.8,
    });

    var currentlyHovered;

    series.columns.template.events.on("pointerover", function (e) {
      handleHover(e.target.dataItem);
    });

    series.columns.template.events.on("pointerout", function (e) {
      handleOut();
    });

    function handleHover(dataItem) {
      if (dataItem && currentlyHovered != dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        var bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 1,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    function handleOut() {
      if (currentlyHovered) {
        var bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 0,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    var circleTemplate = am5.Template.new({});

    series.bullets.push(function (root, series, dataItem) {
      var bulletContainer = am5.Container.new(root, {});
      var circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 34,
          },
          circleTemplate
        )
      );

      var maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 })
      );

      // only containers can be masked, so we add image to another container
      var imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
        })
      );

      // not working
      var image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60,
        })
      );

      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: bulletContainer,
      });
    });

    // heatrule
    series.set("heatRules", [
      {
        dataField: "valueY",
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: series.columns.template,
        key: "fill",
      },
      {
        dataField: "valueY",
        min: am5.color(0xe5dc36),
        max: am5.color(0x5faa46),
        target: circleTemplate,
        key: "fill",
      },
    ]);

    series.data.setAll(dataForMembers);
    xAxis.data.setAll(dataForMembers);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    cursor.events.on("cursormoved", function () {
      var dataItem = series.get("tooltip").dataItem;
      if (dataItem) {
        handleHover(dataItem);
      } else {
        handleOut();
      }
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(1000, 100);
    // end am5.ready(
    return () => {
      root.dispose();
    };
  }, [dataForMembers]);

  return (
    <>
      <div>Total Days : {TotalDaysForTheBatch}</div>
      <div
        id={`chartdiv${batchNoOnClickFromTab}`}
        style={{
          width: "100%",
          height: "500px",
          display: `${chartLoadChecker ? "block" : "none"}`,
        }}
      ></div>
      <div
        style={{ display: `${!chartLoadChecker ? "block" : "none"}` }}
        className='spinner_chart'
      >
        <Spin />
      </div>
    </>
  );
}
export default AmChartDemo;
