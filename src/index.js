// import required node_modules
import GetSheetDone from 'get-sheet-done';
import moment from 'moment';
import _ from 'lodash'
// ================================
// START YOUR APP HERE
// ================================

var schedule = document.getElementById('schedule_weeks'),
sheetData,
curDate = moment().isoWeekday("Monday").format('YYYY-MM-DD'),
untilDate = moment().isoWeekday("Friday").format('YYYY-MM-DD'),
curFrom,
curTo,
trainerNames = {},
scheduleArray = [],
scheduleWeek = [];

// Use the first element in array to convert
// any other data into an object
var twodarray = (arr) => {
  var keys = arr.shift();
  keys = keys.map(item => removeWhitespace(item))
  return arr.map((i)=>{
    var o={};
    for(var j=0;j<keys.length;j++) {
      o[keys[j].toLowerCase()] = i[j];
    }
    return o;
  });
}




GetSheetDone.raw('1Qaoq2mNojwEipDDiMnqclSaAgtqmX4XLy7q6659br8U', 1).then(sheet => {
  sheetData = twodarray(sheet.data);

  GetSheetDone.raw('1Qaoq2mNojwEipDDiMnqclSaAgtqmX4XLy7q6659br8U' , 2).then(trainerKuerzel => {
    trainerNames = twodarray(trainerKuerzel.data);
    trainerNames = trainerNames[0];

    updateCurFromTo();

    //safety setTimeout
    setTimeout(function () {
      renderSchedule(sheetData);
    }, 100);

  })
})

const checkForTrainerRendering = 'datum tag l1 l2 l3 l4 textextern textintern';

const renderSchedule = arr => {
  var week = getCurWeek(arr);
  week = removeEmptyItems(week);
  week.map((item) => {
    var renderContent = '<div class="sub_container">';
    renderContent += addContent([
      'datum', 'tag','openContainer',
      'l1', 'l2', 'l3', 'l4',
      'closeContainer', 'textextern'
    ], item);
    renderContent += '<div class="trainerContainer p_el">';
    for (var propName in item)  {
      if(!searchFor(checkForTrainerRendering, propName)) {
        renderContent += addContent(propName, item);
      }
    }
    renderContent += '</div></div>'
    createScheduleWeek(renderContent);
  })
}


const addContent = (propName, item) => {
  var result = '';
  if(Array.isArray(propName)) {
    for (var i = 0; i < propName.length; i++) {
      if(searchFor(propName[i], 'Container')) {
        if(searchFor(propName[i],'open')) {
          result += '<div class="lehrjahre p_el-np">';
        } else {
          result += '</div>';
        }
      } else {
        if(typeof item[propName[i]] !== 'undefined' && item[propName[i]] !== null) {
          result += '<div class="p_el">' + item[propName[i]] + '</div>';
        } else {
          if(propName[i] === 'textextern')
            result += '<div class="p_el">¯\\_(ツ)_/¯</div>';
          else
            result += '<div class="p_el"></div>';
        }
      }
    }
  } else {
    if(searchFor(propName, 'start')) {
      result += '<div class="t_el"><b>'+ trainerNames[propName.replace('start', '')] + ':</b><br> ' + item[propName] +' - ';
    } else if(searchFor(propName, 'end')) {
      result += item[propName] + '</div>';
    }
  }
  return result
}
// var finalData = '<div class="schedule">' + el + '</div>';


const createScheduleWeek = (elString) => {
  var length = scheduleWeek.length;
  if(length === 0)
    scheduleWeek = scheduleWeek.concat('<div class="schedule">');

  scheduleWeek = scheduleWeek.concat(elString);
  if (length === 5) {
    scheduleWeek = scheduleWeek.concat('</div>');
    addToScheduleArray(scheduleWeek);
    scheduleWeek = [];
  }
}

const addToScheduleArray = week => {
  //cheduleArray = scheduleArray.concat(week);
  var newString = week.join('');
  scheduleArray = scheduleArray.concat(newString);
  renderScheduleMonth();
}

const renderScheduleMonth = () => {
  console.log(scheduleArray.length);
  var finalRender = scheduleArray.join('');
  // console.log(finalRender);
  schedule.innerHTML = finalRender;
}

// returns 1 week of the sheetData
const getCurWeek = arr => {
  return arr.slice(curFrom, (curTo + 1));
}
// map through array and then pass each object to
// the cleanObject function
const removeEmptyItems = arr => {
  return arr.map(item => cleanObject(item));
}
// removes empty object propertys
function cleanObject(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}


const updateCurFromTo = () => {
  curFrom = findInArray(sheetData, 'datum', curDate);
  curTo = findInArray(sheetData, 'datum', untilDate) + 15;
  console.log(curFrom, curTo);
}


const findInArray = (array, attr, value) => {
  for (var i = 0; i < array.length; i++) {
    //console.log('moment ' + moment(array[i][attr]).format('YYYY-MM-DD'), 'orig date '+ array[i][attr]);
    if(array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

function removeWhitespace(el) {
  return el.replace(/\s/g, '');
}

function searchFor(el, search) {
  return el.search(search) >= 0;
}
