import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function repeatPrompt(repeatMethod) {
  Swal.fire({
    title: 'Czy powtórzyć raport?',
    text: "Bieżący raport zostanie nadpisany",
    icon: 'warning',
    background:'#19191a',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#208637',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Tak, wykonaj!',
    cancelButtonText: 'Nie, analuj'
  }).then((result) => {
    if (result.isConfirmed) {
        repeatMethod(); 
    }
  });
}