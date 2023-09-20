import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function deletePromptApiWave(deleteMethod) {
  Swal.fire({
    title: 'Czy usunąć?',
    text: "Operacji nie będzie można cofnąć",
    icon: 'warning',
    background:'#19191a',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#208637',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Tak, usuń!',
    cancelButtonText: 'Nie, analuj'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMethod(); 
    //   Swal.fire({
    //     title:'Usunięto!',
    //     text:'Adres został usunięty',
    //     icon:'success',
    //     color: 'white',
    //     background:'#19191a',
    // });
    }
  });
}