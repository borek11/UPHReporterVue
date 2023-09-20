 import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function savePrompt(saveMethod) {
  Swal.fire({
    title: 'Czy zapisać?',
    text: "Operacji nie będzie można cofnąć",
    icon: 'warning',
    background:'#19191a',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#208637',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Tak, zapisz!',
    cancelButtonText: 'Nie, analuj'
  }).then((result) => {
    if (result.isConfirmed) {
      saveMethod(); // Wywołanie przekazanej metody
      Swal.fire({
        title:'Zapisano!',
        icon:'success',
        color: 'white',
        background:'#19191a',
    });
    }
  });
}