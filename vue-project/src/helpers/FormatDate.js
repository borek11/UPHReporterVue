import moment from 'moment';
export default function formatDate(value) {
    if (value) {
        var convert = moment(value).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
        return convert;
    }
  }