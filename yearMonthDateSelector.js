/* *
 * year-month-date-selector-plugin v1.0.0 @sh
 * 年月日 三連動 selector
 * */
$.fn.yearMonthDateSelector = function(options) {
  var then = this;
  var settings = {
    // 抓取元素位置
    year: $(this).find('select:eq(0)'),
    month: $(this).find('select:eq(1)'),
    date: $(this).find('select:eq(2)'),
    // 畫面呈現的格式, 與 submit value 無關
    formatYear: "西元{{year}}年",
    formatMonth: "{{month}}月",
    formatDate: "{{date}}日",
    // 最大最小顯示年份 , null表示自動(當前年份至1900)
    maxYear: null,
    minYear: 1900,
  };

  $.extend(settings, options);

  then._init = function() {
    // 若元素有缺則停止
    if (settings.year.length !== 1 || settings.month.length !== 1 || settings.date.length !== 1) {
      window.console && console.log('無法取得元素');
      return false;
    }

    // 檢查年份 range並建立年份
    then.setYearOption();

    // 若月份欄位 option 為空則建立
    if (settings.month.find('option').length === 0) {
      then.setMonthOption();
    }

    // 若日期欄位 option 為空則建立 (1月的日期)
    if (settings.date.find('option').length === 0) {
      then.setDateOption();
    }

  };
  then._initEvent = function() {
    settings.year.unbind('change').on('change', function() {
      then.setMonthOption();
      then.setDateOption();
    });
    settings.month.unbind('change').on('change', function() {
      then.setDateOption();
    });
  };

  // 檢查年份 range 並建立年份
  then.setYearOption = function() {
    // 若設定值 maxYear 有誤
    if (isNaN(settings.maxYear) || (settings.maxYear > new Date().getFullYear()) || (settings.maxYear < settings.minYear)) {
      settings.maxYear = new Date().getFullYear();
    }
    // 若年份為空 或是 原option range與設定不同
    if (settings.year.find('option').length === 0 || settings.year.find('option:eq(0)').val() !== settings.maxYear || settings.year.find('option:eq(-1)').val() !== settings.minYear) {
      settings.month.empty();
      settings.year.append($('<option>').val('').text('西元年'));
      for (var i = settings.maxYear; i >= settings.minYear; i--) {
        settings.year.append($('<option>').val(i).text(settings.formatYear.replace(/{{year}}/g, i)));
      }
    }
  };
  // 建立設定月份
  then.setMonthOption = function() {
    if (settings.month.find('option').length < 12) {
      settings.month.empty();
      settings.month.append($('<option>').val('').text('月份'));
      for (var i = 1; i <= 12; i++) {
        settings.month.append($('<option>').val(i).text(settings.formatMonth.replace(/{{month}}/g, i)));
      }
    }
  };
  // 建立設定日期
  then.setDateOption = function() {
    var _year = parseInt(settings.year.val(), 10);
    var _month = parseInt(settings.month.val(), 10);
    var _date = parseInt(settings.date.val(), 10);
    if (isNaN(_month) || isNaN(_year)) {
      settings.date.empty();
      settings.date.append($('<option>').val('').text('日期'));
      return false;
    }

    var dateLength = 31;
    if (_month === 4 || _month === 6 || _month === 9 || _month === 11) {
      dateLength = 30;
    } else if (_month === 2) {
      dateLength = (_year % 4 == 0 && (_year % 100 != 0 || _year % 400 == 0)) ? 28 : 29;
    }

    // 重建
    settings.date.empty();
    for (var i = 1; i <= dateLength; i++) {
      settings.date.append($('<option>').val(i).text(settings.formatDate.replace(/{{date}}/g, i)));
    }
    // 鎖定原select
    settings.date.find('option:eq(' + ( (_date < dateLength) ? (_date - 1) : (dateLength - 1) ) + ')').prop('selected', true);

  };

  then._init();
  then._initEvent();
};