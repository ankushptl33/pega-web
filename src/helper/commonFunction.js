export const generateDropDownObject = (
  data,
  label,
  selectedLabel,
  Handler,
  defaultValue,
) => ({
  data,
  label,
  selectedLabel,
  onchangeHandler: Handler,
  selectedId: defaultValue,
});

export const generateMeasurePerformanceParamObj = (
  filter,
  EntityName,
  props,
  EntityId,
  ParentEntityId,
  ParentEntityName,
) => {
  return {
    MeasuresetId: props.measureSet,
    EntityId,
    DurationFrom: props.customrange ? props.fromdate : props.durationFrom,
    DurationTo: props.customrange ? props.todate : props.durationTo,
    Flag: props.durationFlag,
    EntityName,
    ParentEntityId,
    ParentEntityName,
  };

  // return {
  //   MeasuresetId:
  //     filter != undefined
  //       ? filter.measureset.selectedItem.id
  //       : props.measureSet,
  //   EntityId,
  //   DurationFrom:
  //     filter != undefined
  //       ? filter.customrange
  //         ? filter.fromdate
  //         : filter.duration.startdate
  //       : props.customrange
  //       ? props.fromdate
  //       : props.durationFrom,
  //   DurationTo:
  //     filter != undefined
  //       ? filter.customrange
  //         ? filter.todate
  //         : filter.duration.enddate
  //       : props.customrange
  //       ? props.todate
  //       : props.durationTo,
  //   Flag: filter != undefined ? filter.duration.flag : props.durationFlag,
  //   EntityName: entityName,
  //   ParentEntityId,
  //   ParentEntityName,
  // };
};

export function fnGetPerformanceBarCSSClass(EntityComparison) {
  return {
    '1': 'performance-green',
    '2': 'performance-amber',
    '3': 'performance-red',
  }[EntityComparison];
}

export function fnSetUserFavoriteMeasure(_this, e, props) {
  let classes = e.target.classList;

  if (classes.contains('fa-heart')) {
    if (classes.contains('fal')) {
      e.target.classList.remove('fal');
      e.target.classList.add('fa');
    } else {
      if (!_this.props.Favoritefilter) {
        e.target.classList.remove('fa');
        e.target.classList.add('fal');
      }
    }

    _this.props.SetUserFavoriteMeasureAction({
      measureId: props.measureId,
      isFavorite: props.isFavourite,
    });
  }
}

export function fnUpdateFilterInStore(_this, year) {
  _this.props.measureFilterUpdateAction(
    Object.assign({}, _this.props.MeasureFilterData.selectedValues, {
      year: year,
      duration: _this.props.MeasureFilterData.duration.filter(
        (duration, index) => {
          return (
            duration.year == year && /^(\d{4}Q[1-4]{1})$/.test(duration.id)
          );
        },
      )[0].id,
    }),
  );
}

//Global Function
export const formateDate = (date, dateFormat) => {
  const _date = new Date(date);

  return fnDateFormat(
    fnFormatNumber(_date.getMonth() + 1),
    fnFormatNumber(_date.getDate()),
    fnFormatNumber(_date.getFullYear()),
    dateFormat,
  ).join(dateFormat.replace(/[^-/:]/g, '').replace(/([-\/:])+/g, '$1'));

  function fnFormatNumber(number) {
    if (/[0-9]+/.test(number)) {
      number = Number(number);
      return number < 9 ? ('0' + number).toString() : number.toString();
    }
    return number;
  }

  function fnDateFormat(mm, dd, yy, dateFormat) {
    switch (dateFormat.toUpperCase().replace(/[^A-Z]/gi, '')) {
      case 'MMDDYYYY':
        return new Array(mm, dd, yy);
      case 'DDMMYYYY':
        return new Array(dd, mm, yy);
      case 'YYYYMMDD':
        return new Array(yy, mm, dd);
      default:
        return new Array(mm, dd, yy);
    }
  }
};
