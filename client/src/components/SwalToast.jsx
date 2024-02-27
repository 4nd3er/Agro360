import Swal from 'sweetalert2'

const SwalToast = (icon, title, timer) => Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer || 4000,
    timerProgressBar: true,
}).fire({
    icon: icon,
    title: title
})

export default SwalToast