import { DateTime, Duration } from 'luxon'; 

export default function withFormatDate(WrappedComponent) {
  const func = function (props) {
    const { date } = props;
    const publicationDate = DateTime.fromSQL(date).setLocale('ru'); 
    const currentDate = DateTime.now().setLocale('ru'); 

    
    const diff = currentDate
      .diff(publicationDate, ['years', 'months', 'days', 'hours', 'minutes'])
      .toObject();

    for (const key in diff) {
      diff[key] = Math.floor(diff[key]);
    }

    const { years, months, days, hours, minutes } = diff;

    /**
     * Создает подпись видео
     * @param {*} date - Объект содержащий один из ключей: years, months, days, hours, minutes
     * @returns - строка, прошедшее время со склонением
     */
    const getDateString = (diffDate) => {
      return `${Duration.fromObject(diffDate).toHuman()} назад`
    }

    let dateString = '';
    if (years > 0) {
      dateString = getDateString({years})
    } else if (months > 0) {
      dateString = getDateString({months})
    } else if (days >= 1) {
      dateString = getDateString({days})
    } else if (hours >= 1) {
      dateString = getDateString({hours})
    } else if (minutes !== 0) {
      dateString = getDateString({minutes})
    } else {
      dateString = 'Только что';
    }

    return <WrappedComponent {...props} date={dateString} />;
  };

  func.displayName = `withFormatDate`; 
  return func;
}