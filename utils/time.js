function formatDateToWIB(date) {
    let monthList = [
      "Jan", 
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt", 
      "Nov",
      "Des",
    ];
    let day = date.getDate().toString().padStart(2, "0");
    let month = monthList[date.getMonth()];
    let year = date.getFullYear();
  
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
  
    let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  
    return formattedDate;
}

function rangeDuration(start, end){
    let monthList = [
        "Jan", 
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt", 
        "Nov",
        "Des",
      ];
    if(!start){
        let startAt = "nego"
        return startAt
    }
    
    let startAt = new Date(start)
    let startDay = startAt.getDate().toString().padStart(2, "0");
    let startMonth = monthList[startAt.getMonth()];
    let startYear = startAt.getFullYear();

    if(!end){
        let endAt = 'in progress'
        return `${startDay}${startMonth} - ${endAt}`
    }

    let endAt = new Date(end)
    let endDay = endAt.getDate().toString().padStart(2, "0");
    let endMonth = monthList[endAt.getMonth()];
    let endYear = endAt.getFullYear();

    if(startYear == endYear){
        return `${startDay}${startMonth} - ${endDay}${endMonth} ${endYear}`
    }
    return `${startDay}${startMonth}${startYear} - ${endDay}${endMonth}${endYear}`
}

function duration(start, end){
    if (!start) return "Start date is missing";
    if(!end) return 'in progress';
    
    const startAt =  new Date(start);
    const endAt =  new Date(end);

    if (isNaN(startAt.getTime()) || isNaN(endAt.getTime())) return "Invalid date";
    
    if (endAt < startAt){ return 'End Date must be after start date'}
    let year = endAt.getFullYear() - startAt.getFullYear();
    let months = endAt.getMonth() - startAt.getMonth();
    let days = endAt.getDate() -startAt.getDate();

    if(days < 0){
        months -= 1;
        const dayPrevMonth = new Date(endAt.getFullYear(), endAt.getMonth(), 0);
        days += dayPrevMonth.getDate();
    }

    let result = [];
    if (months > 0) result.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);

    return result.length ? result.join(' ') : '0 day'
}
module.exports = {formatDateToWIB, rangeDuration, duration}