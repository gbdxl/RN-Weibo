/**
 * Created by looper on 2017/8/30.
 */
import moment from 'moment'

export function formartWeiboTime(created_at) {
  const momentObj = moment(created_at, 'ddd MMM DD HH:ss:mm ZZ YYYY');
  const time = momentObj.format('YYYY-MM-D').split('-');
  const temp = moment().format('YYYY-MM-D').split('-');
  let result;
  if (time[0] === temp[0]) {
    if(time[1]===temp[1]){
      if(temp[2]-time[2]===1){
        result = momentObj.format('HH:ss:mm')
      }else if(temp[2]-time[2]===1){
        result = `昨天 ${momentObj.format('HH:ss:mm')}`
      }else {
        result =
      }
    }

  }

}