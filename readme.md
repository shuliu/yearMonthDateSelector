
# year-month-date-selector-plugin
## 年月日 三連動 selector
v1.0.0

@sh


功能:
----

 1. 大月小月判斷, 潤年2月判斷
 2. 顯示格式 format
 3. 年份 range

Example:
--------

```jade
.selector
  select#year.year
  select#month.month
  select#date.date
```

```javascript
$('.selector').yearMonthDateSelector({
  formatYear: '西元 {{year}} 年',
  formatMonth: '{{month}} 月',
  formatDate: '{{date}} 日',
  maxYear: 1995,
  minYear: 1970
});
```