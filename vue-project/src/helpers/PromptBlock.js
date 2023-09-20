import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function blockPrompt(deleteMethod, message) {
  Swal.fire({
    title: 'Czy zablokować użytkownika?',
    text: "Nie będzie on mógł korzystać z serwisu",
    icon: 'warning',
    background:'#19191a',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#208637',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Tak, zablokuj!',
    cancelButtonText: 'Nie, analuj'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMethod(); 
      Swal.fire({
        title:'Zablokowano!',
        text: message,
        icon:'success',
        color: 'white',
        background:'#19191a',
    });
    }
  });
}