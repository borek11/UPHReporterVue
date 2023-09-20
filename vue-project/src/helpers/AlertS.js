import Swal from 'sweetalert2/dist/sweetalert2.js'
export default function alertS(type,message) {
    Swal.fire({
        icon: type,
        color: 'white',
        background:'#19191a',
        title: message,
        confirmButtonText: 'Ok'
    });
  }