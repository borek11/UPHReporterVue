import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function unblockPrompt(deleteMethod, message) {
  Swal.fire({
    title: 'Czy oblokować użytkownika?',
    text: "Będzie on mógł w pełni korzystać z serwisu",
    icon: 'warning',
    background:'#19191a',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#208637',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Tak, odblokuj!',
    cancelButtonText: 'Nie, analuj'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMethod(); 
      Swal.fire({
        title:'Odblokowano!',
        text: message,
        icon:'success',
        color: 'white',
        background:'#19191a',
    });
    }
  });
}